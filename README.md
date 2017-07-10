# GameOn Client (Quasar)

Front end code base for my GameOn app. Built with [Vue](https://github.com/vuejs/vue) and the [Quasar](https://github.com/quasarframework/quasar) framework.

This is a fairly small app, so I don't think there is too much to say here. All of the UI stuff is built on the goodies that come with Quasar, so the look and feel is "Material-like." It uses Vue Router, Vuex, Axios, and handful of other "community favorites" here and there.

Tests are admittedly in a pretty sad state. Quasar itself does not actually come with tests ready to go, so I kind of had to shoehorn them in from the Vue CLI template, but I didn't really end up having the motivation to do much with them for such a small, low-priority project.

If you're looking to download it and run it, it should be fairly straightforward.

- `git clone`
- `npm install`
- `npm run dev`

The biggest "gotcha" will be getting a backend set up for it to communicate with. If you wish to try, the current back end code base (Django REST Framework) can be found [here](https://github.com/gargrave/gameon-server).
