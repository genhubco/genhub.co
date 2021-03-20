#![recursion_limit = "512"]
use wasm_bindgen::prelude::*;
use yew::prelude::*;
use yew_router::prelude::*;

mod components;
mod pages;

use pages::index::Index;

struct Page;

#[derive(Switch, Debug, Clone)]
pub enum AppRoute {
	#[to = "/"]
	Index,
}

impl Component for Page {
	type Message = ();
	type Properties = ();

	fn create(_: Self::Properties, _: ComponentLink<Self>) -> Self {
		Self {}
	}

	fn update(&mut self, _msg: Self::Message) -> ShouldRender {
		false
	}

	fn change(&mut self, _props: Self::Properties) -> ShouldRender {
		false
	}

	fn view(&self) -> Html {
		html! {
			<div class="page-wrapper">
				<div class="page">
					<Router<AppRoute, ()>
						render = Router::render(|switch: AppRoute| {
							match switch {
								AppRoute::Index => html!{<Index/>},
							}
						})
					/>
				</div>
			</div>
		}
	}
}

#[wasm_bindgen(start)]
pub fn run_app() {
	yew::start_app::<Page>();
}
