use yew::prelude::*;

use super::{
	external_link::ExternalLink,
	logo::Logo,
	text::{Color, Size, Text},
};

pub struct Header;

impl Component for Header {
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
			<div class="header">
				<Logo />
				<div>
					<ExternalLink to="https://www.notion.so/Emergence-Official-Docs-0722d17ae7c54e5b85ff94cecb337622">
						<Text color=Color::Info size=Size::Big display="docs" />
					</ExternalLink>
					<ExternalLink to="https://app.genhub.co">
						<Text color=Color::Info size=Size::Big display="demo ›" />
					</ExternalLink>
				</div>
			</div>
		}
	}
}
