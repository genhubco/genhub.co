use yew::prelude::*;

use super::text::Text;

pub struct ExternalLink {
	props: Props,
}

#[derive(Clone, PartialEq, Properties)]
pub struct Props {
	pub to: String,
	pub children: ChildrenWithProps<Text>,
}

impl Component for ExternalLink {
	type Message = ();
	type Properties = Props;

	fn create(props: Self::Properties, _: ComponentLink<Self>) -> Self {
		Self { props }
	}

	fn update(&mut self, _: Self::Message) -> ShouldRender {
		false
	}

	fn change(&mut self, _: Self::Properties) -> ShouldRender {
		false
	}

	fn view(&self) -> Html {
		html! {
			<div class="external-link-container">
				<a target="_blank" rel="noopener noreferrer" href=self.props.to.to_string() class="external-link">
					{ self.props.children.clone()}
				</a>
			</div>
		}
	}
}
