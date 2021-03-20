use yew::prelude::*;

pub struct Logo;

impl Component for Logo {
	type Message = ();
	type Properties = ();

	fn create(_: Self::Properties, _: ComponentLink<Self>) -> Self {
		Self {}
	}

	fn update(&mut self, _: Self::Message) -> ShouldRender {
		false
	}

	fn change(&mut self, _: Self::Properties) -> ShouldRender {
		false
	}

	fn view(&self) -> Html {
		html! {
			<div class="logo-container">
				<a href="/" class="logo-link">
					<img class="logo" src="./assets/applogo.svg" />
				</a>
			</div>
		}
	}
}
