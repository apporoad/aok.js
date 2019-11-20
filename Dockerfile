FROM node:8-alpine

RUN mkdir -p /aok/node_modules
RUN mkdir /api
RUN mkdir /static

#WORKDIR /aok
 
ADD node_modules/ /aok/node_modules/
ADD bin.js /aok/bin.js
ADD index.js /aok/index.js
ADD meta.js /aok/meta.js
ADD package.json /aok/package.json

ADD example/data.json /api/data.json
ADD example/index.html /static/index.html

EXPOSE 1154
 
CMD ["node", "/aok/bin.js", "/api","-s","/static","-p","1154"]