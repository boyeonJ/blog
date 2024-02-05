import { PageProps, graphql } from "gatsby"
import FlexBox from "../components/atoms/flex_box"
import { FC } from "react";
import Spacing from "../components/atoms/spacing"
import StyledTypography from "../components/atoms/styled_typography"
import Layout from "../components/layout"
import colors from "../constants/colors"
import { Experience, GraphQLNode, PersonalProject, Project, Skill } from "../models/types"
import IconButton from "../components/atoms/icon_button";

const Resume = ({
    data: {
        site: {
            siteMetadata: {
                resumeInfo: {
                    experiences,
                    projects,
                    personalProjects,
                    skills
                }
            }
        },
    } }: PageProps<GraphQLNode>) => {

    return (
        <FlexBox gap={"100px"}>
            <Info />
            <Experiences experiences={experiences} projects={projects} />
            <PersonalProjects projects={personalProjects} />
            {/* <Skills skills={skills} /> */}
        </FlexBox>
    )
}

const Info = () => {
    return (
        <FlexBox>
            <StyledTypography variant="h2B">정보연</StyledTypography>
            <StyledTypography variant="h2B">Software Developer</StyledTypography>
            <Spacing size={20} />
            <StyledTypography>
                안녕하세요. <br />Software Developer 정보연입니다. <br /><br />

                React와 Typescript를 중심으로 개발합니다.<br />
                생산성을 위한 클린한 코드와 사용자 경험을 위한 최적화에 관심이 많습니다.  <br /><br />

                BespinGlobal 에서 2년 11개월, Fasto에서 9개월 <br />총 3년 8개월 Software Developer 경력이 있습니다.<br />
            </StyledTypography>
        </FlexBox >
    )
}

const Experiences = ({ experiences, projects }: { experiences: Experience[], projects: Project[] }) => {
    return (
        <FlexBox gap="50px">
            <StyledTypography variant="h2B">Experiences</StyledTypography>

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
                    <ExperienceProjects projects={projects.filter((project: Project) => project.company === experience.name)} />
                </FlexBox>
            ))
            }
        </FlexBox >
    )
}

const ExperienceProjects = ({ projects }: { projects: Project[] }) => {
    return (
        <FlexBox css={{ flex: '1 0 0' }} gap="40px">
            {projects.map((project: Project) => (
                <FlexBox gap="10px" key={project.name} >
                    <StyledTypography variant="h5">{project.name}</StyledTypography>
                    <StyledTypography color="gray1">{project.period}</StyledTypography>
                    <StyledTypography color="gray1" innerHtml>{project.description}</StyledTypography>
                    <ul css={{ paddingLeft: '20px', color: colors.gray2, listStylePosition: 'outside' }}>
                        {project.results.map((result) => (
                            <li key={result}>
                                <StyledTypography innerHtml>{result}</StyledTypography>
                            </li>
                        ))}
                        {/* {project.tasks.map((task: string) => (
                            <li key={task}>
                                <StyledTypography innerHtml>{task}</StyledTypography>
                            </li>
                        ))} */}
                    </ul>
                    <ProjectSkills skills={project.skills} />
                </FlexBox >
            ))
            }
        </FlexBox >
    )
}

const ProjectSkills = ({ skills }: { skills: string[] }) => {
    return (
        <FlexBox direction="row" css={{ flexWrap: 'wrap' }} gap="10px">
            {skills.map((skill: string) => (
                <div key={skill} css={{ backgroundColor: colors.gray12, borderRadius: '8px', padding: '4px 10px' }}>
                    <StyledTypography color="gray2">{skill}</StyledTypography>
                </div>
            ))}
        </FlexBox>
    )
}


const PersonalProjects = ({ projects }: { projects: PersonalProject[] }) => {
    return (
        <FlexBox gap="50px">
            <StyledTypography variant="h2B">Personal Projects</StyledTypography>
            {
                projects.map((project: PersonalProject) => (
                    <FlexBox direction="row" gap="10px" key={project.name}>
                        <FlexBox gap="10px" css={{ flex: '0 0 200px' }}>
                            <StyledTypography variant="h3">
                                {project.name}
                            </StyledTypography>
                            <StyledTypography color="gray1">
                                {project.period}
                            </StyledTypography>
                            <StyledTypography color="gray1">
                                {project.description}
                            </StyledTypography>
                            {/* {project.what.map((what: string) => (
                        <StyledTypography color="gray2">{what}</StyledTypography>
                    ))} */}
                        </FlexBox >

                        <FlexBox css={{ flex: '1 0 0' }} gap="40px">
                            <FlexBox gap="30px" key={project.name} >
                                <ul css={{ paddingLeft: '20px', margin: 0, color: colors.gray2, listStylePosition: 'outside' }}>
                                    {project.results.map((result: string) => (
                                        <li key={result}>
                                            <StyledTypography innerHtml>{result}</StyledTypography>
                                        </li>
                                    ))}
                                </ul>
                                <ProjectSkills skills={project.skills} />
                            </FlexBox>
                        </FlexBox>
                    </FlexBox>

                ))
            }
        </FlexBox >
    )
}

const Skills = ({ skills }: { skills: Skill[] }) => {
    return (
        <FlexBox gap={"50px"}>
            <StyledTypography variant="h2B">Skills</StyledTypography>
            {skills.map((skill: Skill) => (
                <FlexBox gap="10px" key={skill.name}>
                    <StyledTypography variant="h4">{skill.name}</StyledTypography>
                    <ul>
                        {skill.contents.map((content: string) => (
                            <li key={content}>
                                <StyledTypography innerHtml>{content}</StyledTypography>
                            </li>
                        ))}
                    </ul>
                </FlexBox>
            ))}
        </FlexBox >
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
                tasks,
                results
            }
            personalProjects {
                name,
                period,
                description,
                skills,
                results
            }
            skills {
                name,
                contents
            }
      }
    }
  }
            file(name: {eq: "personal-project-blog" }) {
                childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
    }
  }
}
            `