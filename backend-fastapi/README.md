# Backend FastApi
Tech Stack - This backend is FastApi based.

## Create and Activate venv
python -m venv venv-fastapi
venv-fastapi\Scripts\activate 
in case of linux look for and run `venv-fastapi\bin\activate` or install and run in your conda environment.

## Install
pip install -r requirements.txt
or
pip install --trusted-host pypi.python.org --trusted-host files.pythonhosted.org --trusted-host pypi.org -r requirements.txt

## Run
uvicorn main:app --reload

## Sample local host url
http://127.0.0.1:8000/
http://127.0.0.1:8000/docs (for swagger)