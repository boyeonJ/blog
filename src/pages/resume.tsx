import { PageProps, graphql } from "gatsby"
import FlexBox from "../components/atoms/flex_box"
import { FC } from "react";
import Spacing from "../components/atoms/spacing"
import StyledTypography from "../components/atoms/styled_typography"
import Layout from "../components/layout"
import colors from "../constants/colors"
import { Experience, GraphQLNode, Project } from "../models/types"

const Resume: FC<PageProps<GraphQLNode>> = ({
    data: {
        site: {
            siteMetadata: {
                resumeInfo: {
                    experiences,
                    projects
                }
            }
        }
    } }) => {

    return (
        <Layout>
            <Info />
            <Spacing size={1} css={{ margin: '30px 0' }} />
            <Experiences experiences={experiences} projects={projects} />
            {/* <ExperiencesBack experiences={resumeInfo.experiences} />
            <Spacing size={1} css={{ border: `1px solid ${colors.gray1}`, margin: '30px 0' }} />
            <Projects projects={resumeInfo.projects} /> */}
        </Layout >
    )
}

const Info = () => {
    return (
        <FlexBox>
            <StyledTypography variant="h2">정보연</StyledTypography>
            <StyledTypography variant="h2">Frontend Developer</StyledTypography>
            <Spacing size={20} />
            <StyledTypography color="gray2">
                안녕하세요. Frontend Developer 정보연입니다. <br /><br />

                React와 Typescript를 중심을 개발합니다.<br />
                클린한 코드를 작성하고 최적화하는 것을 목표로 개발합니다.<br /><br />

                BespinGlobal 에서 2년 11개월, Fasto에서 9개월 <br />총 3년 8개월 Frontend Developer로 근무했던 경험이 있습니다.<br />
            </StyledTypography>
        </FlexBox >
    )
}

const Experiences = ({ experiences, projects }: { experiences: Experience[], projects: Project[] }) => {
    return (
        <FlexBox gap="50px">
            <StyledTypography variant="h2">Experiences</StyledTypography>

            {experiences.map((experience: Experience) => (
                <FlexBox direction="row" gap="10px" key={experience.name}>
                    <FlexBox gap="10px" css={{ flex: '0 0 200px' }}>
                        <StyledTypography variant="h3">
                            {experience.name}
                        </StyledTypography>
                        <StyledTypography color="gray1">
                            {experience.period}
                        </StyledTypography>
                        <StyledTypography color="gray1">
                            {experience.position}
                        </StyledTypography>
                        <StyledTypography color="gray1">
                            {experience.description}
                        </StyledTypography>
                    </FlexBox>
                    <Projects projects={projects.filter((project: Project) => project.company === experience.name)} />
                </FlexBox>
            ))
            }
        </FlexBox >
    )
}

const Projects = ({ projects }: { projects: Project[] }) => {
    return (
        <FlexBox css={{ flex: '1 0 0' }} gap="40px">
            {projects.map((project: Project) => (
                <FlexBox gap="10px" key={project.name}>
                    <StyledTypography variant="h5">{project.name}</StyledTypography>
                    <StyledTypography color="gray1">{project.period}</StyledTypography>
                    <StyledTypography color="gray1" innerHtml>{project.description}</StyledTypography>
                    {/* {project.what.map((what: string) => (
                        <StyledTypography color="gray2">{what}</StyledTypography>
                    ))} */}
                    <ul css={{ paddingLeft: '20px', color: colors.gray2, listStylePosition: 'outside' }}>
                        {project.results.map((result: string) => (
                            <li>
                                <StyledTypography innerHtml>{result}</StyledTypography>
                            </li>
                        ))}
                    </ul>
                    <Skills skills={project.skills} />
                </FlexBox >
            ))
            }
        </FlexBox >
    )
}

const Skills = ({ skills }: { skills: string[] }) => {
    return (
        <FlexBox direction="row" css={{ flexWrap: 'wrap' }} gap="10px">
            {skills.map((skill: string) => (
                <div css={{ backgroundColor: colors.gray12, borderRadius: '8px', padding: '4px 10px' }}>
                    <StyledTypography color="gray2">{skill}</StyledTypography>
                </div>
            ))}
        </FlexBox>
    )
}

const ExperiencesBack = ({ experiences }: { experiences: Experience[] }) => {
    return (
        <FlexBox gap="20px">
            {experiences.map((experience: Experience) => (
                <FlexBox key={experience.name} direction="row" gap="10px" align="center" css={{ width: '100vw' }}>
                    <FlexBox css={{ flex: '3 1 0' }} gap="5px">
                        <StyledTypography variant="h1">{experience.name}</StyledTypography>
                        <StyledTypography variant="h3" color="gray2">{experience.position}</StyledTypography>
                        <StyledTypography variant="h3" color="gray2">{experience.period}</StyledTypography>
                    </FlexBox>
                    <div css={{ flex: '7 1 0' }}>
                        <StyledTypography>{experience.description}</StyledTypography>
                    </div>
                </FlexBox>
            ))
            }
        </FlexBox >
    )
}

const ProjectsBack = ({ projects }: { projects: Project[] }) => {
    return (
        <FlexBox gap="20px">
            {projects.map((project: Project) => (
                <FlexBox key={project.name} direction="row" gap="20px" align="center" css={{ width: '100vw' }}>
                    <FlexBox css={{ width: '15%' }} gap="5px">
                        <StyledTypography variant="h1">{project.name}</StyledTypography>
                        <StyledTypography variant="h3" color="gray2">{project.company}</StyledTypography>
                        <StyledTypography variant="h3" color="gray2">{project.period}</StyledTypography>
                    </FlexBox>
                    <FlexBox css={{ margin: '0 20px' }}>
                        <StyledTypography>{project.description}</StyledTypography>
                        <FlexBox direction="row" gap="5px">
                            {project.skills.map((skill) => (<StyledTypography key={skill} color="gray2">#{skill}</StyledTypography>))}
                        </FlexBox>
                    </FlexBox>
                </FlexBox>
            ))}
        </FlexBox>
    )
}

export default Resume;
export { Head } from "../components/head"

export const getResumeInfo = graphql`
query getResumeInfo {
  site {
    siteMetadata {
      resumeInfo {
        experiences {
            name,
            position,
            period,
            description
        },
        projects {
            name,
            company,
            period,
            description,
            skills,
            what,
            results
        }
      }
    }
  }
}
`