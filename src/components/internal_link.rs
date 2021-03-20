use yew::prelude::*;

use super::text::Text;

pub struct InternalLink {
	props: Props,
}

#[derive(Clone, PartialEq, Properties)]
pub struct Props {
	pub to: String,
	pub children: ChildrenWithProps<Text>,
}

impl Component for InternalLink {
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
			<div class="internal-link-container">
				<a href=self.props.to.to_string() class="internal-link">
					{ self.props.children.clone()}
				</a>
			</div>
		}
	}
}
