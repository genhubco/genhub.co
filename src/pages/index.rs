use yew::prelude::*;

use crate::components::{
	external_link::ExternalLink,
	footer::Footer,
	header::Header,
	text::{Color, Size as TextSize, Text},
	title::{Size as TitleSize, Title},
};

pub struct Index;

impl Component for Index {
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
			<div class="index">
				<Header/>
				{self.view_top_section()}
				{self.view_product()}
				<Footer/>
			</div>
		}
	}
}

impl Index {
	fn view_top_section(&self) -> Html {
		html! {
			<div class="top-section">
				<div class="slogan-container">
					<Title size=TitleSize::Big display="Next-gen synthetic biology platform"/>
				</div>
				<div class="sub-slogan-container">
					<Title size=TitleSize::Medium display="We are turning biology into information technology"/>
				</div>
				<div class="contact">
					<Text size=TextSize::Medium color=Color::Normal display="contact us at"/>
					<ExternalLink to="mailto:team@genhub.co">
						<Text size=TextSize::Medium color=Color::Info display="team@genhub.co"/>
					</ExternalLink>
				</div>
			</div>
		}
	}

	fn view_product(&self) -> Html {
		html! {
			<div class="product">
				<div class="product-title">
					<Text size=TextSize::Big color=Color::Normal display="Emergence programming language"/>
				</div>
				<div class="product-body">
					<div class="process">
						<img class="process-step-img" src="./assets/first-part.svg" />
						<div class="process-text">
							<div>
								<Text size=TextSize::Medium color=Color::Normal display="1. Write a program."/>
							</div>
							<Text size=TextSize::Small color=Color::Desc display="Emergence is a modern and minimalistic language for writing biological circuits."/>
						</div>
					</div>
					<div class="process">
						<img class="process-step-img" src="./assets/second-part.svg" />
						<div class="process-text">
							<div>
								<Text size=TextSize::Medium color=Color::Normal display="2. Compile it to a genetic circuit."/>
							</div>
							<Text size=TextSize::Small color=Color::Desc display="Evaluate the gates assigned by the compiler."/>
						</div>
					</div>
					<div class="process">
						<img class="process-step-img" src="./assets/third-part.svg" />
						<div class="process-text">
							<div>
								<Text size=TextSize::Medium color=Color::Normal display="3. Predict the results."/>
							</div>
							<Text size=TextSize::Small color=Color::Desc display="See what to expect before doing the experiment."/>
						</div>
					</div>
				</div>
			</div>
		}
	}
}
