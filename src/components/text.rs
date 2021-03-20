use yew::prelude::*;

#[derive(Clone, PartialEq, Eq)]
pub enum Color {
	Normal,
	Warning,
	Error,
	Desc,
	Success,
	Info,
}

impl Color {
	fn class(&self) -> String {
		let class_str = match self {
			Self::Normal => "text-normal",
			Self::Warning => "text-warning",
			Self::Error => "text-error",
			Self::Desc => "text-desc",
			Self::Success => "text-success",
			Self::Info => "text-info",
		};
		String::from(class_str)
	}
}

#[derive(Clone, PartialEq, Eq)]
pub enum Size {
	Small,
	Medium,
	Big,
}

impl Size {
	fn class(&self) -> String {
		let class_str = match self {
			Self::Small => "text-small",
			Self::Medium => "text-medium",
			Self::Big => "text-big",
		};
		String::from(class_str)
	}
}

#[derive(Clone, PartialEq, Properties)]
pub struct Props {
	pub color: Color,
	pub size: Size,
	pub display: String,
}

pub struct Text {
	props: Props,
}

impl Component for Text {
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
		let classes = vec!["text".to_string(), self.props.color.class(), self.props.size.class()];
		let class = classes.join(" ");
		html! {
			<span class=class>{ self.props.display.clone() }</span>
		}
	}
}
