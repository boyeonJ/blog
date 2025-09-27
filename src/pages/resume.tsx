import {graphql, PageProps} from "gatsby"
import FlexBox from "../components/atoms/flex_box"
import {ReactNode} from "react";
import Spacing from "../components/atoms/spacing"
import StyledTypography from "../components/atoms/styled_typography"
import colors from "../constants/colors"
import {Experience, GraphQLNode, PersonalProject, Project} from "../models/types"
import Chip from "../components/chip";
import {css} from "@emotion/react";


const styles = {
    box: css({
        border: `1px solid ${colors.gray9}`,
        boxShadow: '2px 2px 2px var(--clr-grey-11)',
        borderRadius: '10px',
        marginBottom: '20px',
        padding: `20px 20px`,
        width: '100%'
    })
}

const Resume = ({
    data: {
        site: {
            siteMetadata: {
                resumeInfo: {
                    experiences,
                    projects,
                    personalProjects,
                }
            }
        },
    } }: PageProps<GraphQLNode>) => {

    return (
        <FlexBox gap={"70px"}>
            <Info />
            <ResumeSection name="Experiences">
                {experiences.map((experience: Experience) => (
                    <ResumeArticle key={experience.name} info={experience}>
                        {projects.
                            filter((project: Project) => project.company === experience.name).
                            map((project: Project) => (
                                <ProjectInfo key={project.name} project={project} />
                            ))}
                    </ResumeArticle>
                ))}
            </ResumeSection>
            <ResumeSection name="Personal Projects">
                <div css={styles.box}>
                    {personalProjects.map((personalProjects: PersonalProject) => (
                        <ProjectsInfo key={personalProjects.name} projects={[personalProjects]} />
                    ))}
                </div>
            </ResumeSection>
        </FlexBox >
    )
}

const Info = () => {
    return (
        <FlexBox>
            <StyledTypography variant="h2B">정보연</StyledTypography>
            <StyledTypography variant="h2B">Software Developer</StyledTypography>
            <Spacing size={15} />
            <StyledTypography>
                6년차 프론트엔드 개발자로서, 주로 React와 TypeScript 기반의 앱과 웹 서비스를 개발·배포·운영하며 HTML/CSS와 Web API 등 프론트엔드 기본기를 깊고 단단하게 다져왔습니다. <br /><br />
                기술을 단순히 활용하는 것을 넘어 다양한 설계 패턴과 패러다임을 고민하며 사용자와 개발자 모두가 만족할 수 있는 코드 작성에 즐거움과 책임감을 느낍니다. 하나의 기능, 한 줄의 코드에도 고민을 담아 의미 있게 채워가고자 합니다.
            </StyledTypography>
        </FlexBox >
    )
}

const ResumeSection = ({ name, children }: { name: string, children: ReactNode }) => {
    return (
        <FlexBox gap="30px" css={{ width: '100%' }}>
            <StyledTypography variant="h2B">{name}</StyledTypography>
            {children}
        </FlexBox >
    )
}

const ResumeArticle = ({
    info: {
        name,
        period,
        position,
        description
    },
    children }:
    {
        info: {
            name: string
            period: string
            position?: string
            description: string
        }
        children: ReactNode
    }) => {
    return (
        <FlexBox css={styles.box}>
            <FlexBox gap="10px" css={{ flex: '0 0 200px' }}>
                <StyledTypography variant="h2B">
                    {name}
                </StyledTypography>
                <StyledTypography color="gray1">
                    {period}
                </StyledTypography>
                <StyledTypography color="gray1">
                    {position}
                </StyledTypography>
                <StyledTypography color="gray1">
                    {description}
                </StyledTypography>
            </FlexBox>
            {children}
        </FlexBox>
    )
}

const ProjectInfo = ({ project }: { project: Project }) => {
    return (
        <FlexBox gap="10px" key={project.name} css={{ paddingBottom: '50px' }}>
            <StyledTypography variant="h5B">{project.name}</StyledTypography>
            <StyledTypography color="gray1">{project.period}</StyledTypography>
            <StyledTypography color="gray1" innerHtml>{project.description}</StyledTypography>
            <ul css={{ paddingLeft: '20px', color: colors.gray2, listStylePosition: 'outside' }}>
                {project.results.map((result) => (
                    <li key={result}>
                        <StyledTypography innerHtml>{result}</StyledTypography>
                    </li>
                ))}
            </ul>
            <FlexBox direction="row" css={{ flexWrap: 'wrap' }} gap="10px">
                {project.skills.map((skill: string) => (
                    <Chip key={skill} label={skill} />
                ))}
            </FlexBox>
        </FlexBox >
    )
}

const ProjectsInfo = ({ projects }: { projects: (Omit<Project, "tasks" | "company">)[] }) => {
    return (
        <FlexBox css={{ flex: '1 0 0' }} gap="40px">
            {projects.map((project: Omit<Project, "tasks" | "company">) => (
                <FlexBox gap="10px" key={project.name} >
                    <StyledTypography variant="h5B">{project.name}</StyledTypography>
                    <StyledTypography color="gray1">{project.period}</StyledTypography>
                    <StyledTypography color="gray1" innerHtml>{project.description}</StyledTypography>
                    <ul css={{ paddingLeft: '20px', color: colors.gray2, listStylePosition: 'outside' }}>
                        {project.results.map((result) => (
                            <li key={result}>
                                <StyledTypography innerHtml>{result}</StyledTypography>
                            </li>
                        ))}
                    </ul>
                    <FlexBox direction="row" css={{ flexWrap: 'wrap' }} gap="10px">
                        {project.skills.map((skill: string) => (
                            <Chip key={skill} label={skill} />
                        ))}
                    </FlexBox>
                </FlexBox >
            ))
            }
        </FlexBox >
    )
}

export default Resume;
export { Head } from "../components/head"

export const getResumeInfo = graphql`
            query getResumeInfo {
                site {
                siteMetadata {
                title,
                description,
                siteUrl,
                author,
                image,
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
