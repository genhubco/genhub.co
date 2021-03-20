use yew::prelude::*;

use super::{
	external_link::ExternalLink,
	text::{Color, Size, Text},
};

pub struct Footer;

impl Component for Footer {
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
			<div class="footer">
				<ExternalLink to="mailto:team@genhub.co">
					<Text color=Color::Info size=Size::Medium display="contact"/>
				</ExternalLink>
				<ExternalLink to="https://twitter.com/gogenhub">
					<Text color=Color::Info size=Size::Medium display="twitter"/>
				</ExternalLink>
				<ExternalLink to="https://angel.co/gogenhub/jobs">
					<Text color=Color::Info size=Size::Medium display="jobs"/>
				</ExternalLink>
			</div>
		}
	}
}
