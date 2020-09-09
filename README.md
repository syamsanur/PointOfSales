# posapp
Point Of Sales App is a application where the user can order many kind of beverages, add new beverages, and see order history.

## Features
- Order many kind of beverages.
- Add new beverages.
- See your order history, including how many you make today, how many you make this year, and how many you make order this week, a graph that show how many revenue you make.

## Development
This app was build using Bootsrap 4 and few javascript, for now it only show the interface, this app is still in development

![image](https://github.com/syamsanur/posapp/blob/master/src/assets/posapp.png)

## DOM
The Document Object Model (DOM) is a programming interface for HTML and XML documents.
It represents the page so that programs can change the document structure, style, and content.
The DOM represents the document as nodes and objects.
That way, programming languages can connect to the page.

The W3C DOM and WHATWG DOM standards are implemented in most modern browsers.
Many browsers extend the standard, so care must be exercised when using them on the web where documents may be accessed by various browsers with different DOMs.

## Virtual DOM
The Virtual DOM is an abstraction of the HTML DOM. It is lightweight and detached from the browser-specific implementation details. Since the DOM itself was already an abstraction, the virtual DOM is, in fact, an abstraction of an abstraction.

## VUE
Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

## SSR, CSR, SPA
SSR or Server Side Rendering is the process where server sends data directly to the browser to draw layout. Browser doesn't need to call any api to fetch data from any source and manipulate the DOM(Document Object Model). So, no api calls, still all required data pre-loaded in browser.

With a client-side rendering solution, you redirect the request to a single HTML file and the server will deliver it without any content (or with a loading screen) until you fetch all the JavaScript and let the browser compile everything before rendering the content.

A single-page application (SPA) is an app that works inside a browser and does not require page reloading during use. You are using this type of applications every day. These are, for instance: Gmail, Google Maps, Facebook or GitHub


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
