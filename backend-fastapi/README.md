# Backend FastApi
Tech Stack - This backend is FastApi based.

## Create and Activate venv
cd backend-fastapi (if not already in this directory)
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

## In case of documents not showing in UI, check below link works fine
http://127.0.0.1:8000/docs and look for any errors in the terminal.

In some cases, you need to add your certificate in llm_engine.py like below:
import os
#os.environ['REQUESTS_CA_BUNDLE']= "C:\<PathTo>\<NameOf>Certificate.pem"

Also, during the cold start (firt time api call is made after it is maded to run), it may take a while to respond.