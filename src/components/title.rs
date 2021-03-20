use yew::prelude::*;

#[derive(Clone, PartialEq, Eq)]
pub enum Size {
	Small,
	Medium,
	Big,
}

impl Size {
	fn class(&self) -> String {
		let class_str = match self {
			Self::Small => "title-small",
			Self::Medium => "title-normal",
			Self::Big => "title-big",
		};
		String::from(class_str)
	}
}

#[derive(Clone, PartialEq, Properties)]
pub struct Props {
	pub size: Size,
	pub display: String,
}

pub struct Title {
	props: Props,
}

impl Component for Title {
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
		let classes = vec!["title".to_string(), self.props.size.class()];
		let class = classes.join(" ");

		match self.props.size {
			Size::Small => html! {
				<h3 class=class>{ self.props.display.clone() }</h3>
			},
			Size::Medium => html! {
				<h2 class=class>{ self.props.display.clone() }</h2>
			},
			Size::Big => html! {
				<h1 class=class>{ self.props.display.clone() }</h1>
			},
		}
	}
}
