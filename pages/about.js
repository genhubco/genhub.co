import React from "react";
import css from "styled-jsx/css";

import Page from "../components/Page";
import Container from "../components/Container";
import ExternalLink from "../components/ExternalLink";
import Text from "../components/Text";
import Title from "../components/Title";

const About = () => (
	<Page>
		<>
			<Container>
				<div className="mission">
					<div className="mission-title">
						<Title>Mission</Title>
					</div>
					<div className="mission-statement">
						<Text>
							Our mission is to turn biology into an engineering discipline and unlock
							the possibilities of the most powerful manufacturing technology. We are
							helping partners develop living medicines, process waste, protect and
							fertilize crops and much more.
						</Text>
					</div>
				</div>
			</Container>
			<Container>
				<div className="team">
					<div className="team-title">
						<Title>Team</Title>
					</div>
					<div className="team-body">
						<div className="profile-row">
							<div className="profile">
								<div className="profile-picture-frame">
									<img className="profile-picture" src="filip.jpg" />
								</div>
								<ExternalLink to="https://www.linkedin.com/in/filip-lazovic-571493210/">
									<Text>Filip Lazovic</Text>
								</ExternalLink>
							</div>
							<div className="profile">
								<div className="profile-picture-frame">
									<img className="profile-picture" src="jake.jpeg" />
								</div>
								<ExternalLink to="https://www.linkedin.com/in/jake-p-3b093b124/">
									<Text>Jake Pham</Text>
								</ExternalLink>
							</div>
						</div>
						<div className="section-subtitle">
							<Title small>Mentors</Title>
						</div>
						<div className="profile-row">
							<div className="profile">
								<div className="profile-picture-frame">
									<img className="profile-picture" src="nicolas.jpeg" />
								</div>
								<ExternalLink to="https://www.linkedin.com/in/nicolas-keller-85995383/">
									<Text>Nicolas Keller</Text>
								</ExternalLink>
							</div>
							<div className="profile">
								<div className="profile-picture-frame">
									<img className="profile-picture" src="sanka.jpeg" />
								</div>
								<ExternalLink to="https://www.linkedin.com/in/rkrishnasanka/">
									<Text>Radhakrishna Sanka</Text>
								</ExternalLink>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<style jsx>{styles}</style>
		</>
	</Page>
);

const styles = css`
	.mission {
		background: url(about-bg.svg);
	}

	.mission-title {
		text-align: center;
		padding: 100px 0 20px 0;
	}

	.team-title {
		text-align: center;
		padding: 40px 0 40px 0;
	}

	.section-subtitle {
		text-align: center;
		padding: 40px 0 20px 0;
	}

	.mission-statement {
		text-align: center;
		padding: 20px 20px 100px 20px;
	}

	.team-body {
		padding-bottom: 40px;
	}

	.profile-row {
		margin: auto;
		display: flex;
		width: 330px;
		justify-content: space-between;
	}

	.profile {
		text-align: center;
		width: 140px;
	}

	.profile-picture-frame {
		padding-bottom: 10px;
	}

	.profile-picture {
		border-radius: 50%;
		width: 100px;
	}
`;

export default About;
