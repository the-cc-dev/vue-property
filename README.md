# vue-property

A Simple plugin for fetching properties from an API for front-end use.


## Install

~~~
> sudo npm install @websanova/vue-property
~~~


## Usage

For the simplest usage just include and the package will look for the local environment in the project root `./.env` and for default environment specific files in  `./src/env/` folder.

~~~
Vue.use(require('@websanova/vue-property'));
~~~