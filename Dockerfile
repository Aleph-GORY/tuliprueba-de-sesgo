FROM public.ecr.aws/lambda/python:3.8

# Copy function code
COPY handler.py ${LAMBDA_TASK_ROOT}
COPY . /tuliprueba

# Install the function's dependencies using file requirements.txt
# from your project folder.

COPY requirements-aws.txt  .
RUN  pip3 install -r requirements-aws.txt --target "${LAMBDA_TASK_ROOT}"
RUN  pip3 install /tuliprueba

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "handler.handler" ]