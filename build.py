import os
import subprocess
from shutil import copyfile
import re

PATH = os.getcwd()
BACKEND = os.path.join(PATH, 'backend', 'website')
FRONTEND = os.path.join(PATH, 'frontend')
ANGULAR = os.path.join('static', 'angular')
TEMPLATES = os.path.join('templates')
INDEX = 'index.html'

if __name__ == "__main__":

    print('Start building production assets...')

    p = subprocess.Popen(
        "ng build --prod --outputPath={0} --deployUrl={1}/".format(
            os.path.join(BACKEND, ANGULAR), ANGULAR
        ),
        cwd=FRONTEND,
        shell=True)
    p.wait()
    copyfile(os.path.join(BACKEND, ANGULAR, INDEX), os.path.join(BACKEND, TEMPLATES, INDEX))
    with open(os.path.join(BACKEND, TEMPLATES, INDEX), "r+") as f:
        data = "{% load static %}\n" + f.read()
        f.seek(0)
        data = re.sub(r'static[\\,/]', r"{% static '", data)
        data = re.sub(r'assets/', r"{% static 'angular/assets/", data)
        data = re.sub(r'\.(js|css|jpeg|png|jpg)', r".\1' %}", data)
        data = re.sub(r'<body>', r"<body>\n{% csrf_token %}", data)
        f.write(data)
        f.truncate()
