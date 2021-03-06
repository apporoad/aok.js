# here is v2
FROM node:8-alpine

RUN mkdir -p /aok/node_modules
RUN mkdir /api
RUN mkdir /static
RUN mkdir /workspace

#WORKDIR /aok
 
ADD node_modules/ /aok/node_modules/
ADD bin.js /aok/bin.js
ADD index.js /aok/index.js
ADD meta.js /aok/meta.js
ADD cleanup.js /aok/cleanup.js
ADD package.json /aok/package.json
ADD docs/dockerRun.sh /run.sh

ADD example/data.json /api/data.json
ADD example/index.html /static/index.html

EXPOSE 1154
 
CMD ["sh", "/run.sh", "|", "tee", "/dev/stdout"]