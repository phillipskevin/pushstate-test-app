import { Component, route, DefineMap, RoutePushstate, stacheRouteHelpers } from "can";

window.route = route;

const RouteData = DefineMap.extend({
    page: "string",
    section: "string"
});

Component.extend({
    tag: "my-app",

    view: `
        <h1>You are on the "{{routeData.page}}" page {{# if(routeData.section) }} section {{routeData.section}} {{/ if }}</h1>

        <div>
            {{# switch(routeData.page) }}
                {{# case("home") }}
                    <a href="{{ routeUrl(page='search') }}">Search</a>
                {{/ case }}

                {{# case("search") }}
                    <a href="{{ routeUrl(page='home') }}">Home</a>
                    <a href="{{ routeUrl(page='list') }}">List</a>
                {{/ case }}

                {{# case("list") }}
                    <a href="{{ routeUrl(page='home') }}">Home</a>
                    <a href="{{ routeUrl(page='search') }}">Search</a>
                {{/ case }}
            {{/ switch }}
        </div>
    `,

    ViewModel: {
		routeData: {
			default() {
				route.data = new RouteData();
                route.urlData = new RoutePushstate();
//                route.urlData.root = "/foo/"
                route.register("{page}", { page: "home" });
                route.register("{page}/{section}");

				route.start();
				return route.data;
			}
		}
    }
})
