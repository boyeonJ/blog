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
                resumeInfo
            }
        }
    } }) => {

    return (
        <Layout>
            <Experiences experiences={resumeInfo.experiences} />
            <Spacing size={1} css={{ border: `1px solid ${colors.gray1}`, margin: '30px 0' }} />
            <Projects projects={resumeInfo.projects} />
        </Layout >
    )
}

const Experiences = ({ experiences }: { experiences: Experience[] }) => {
    return (
        <FlexBox gap="20px">
            {experiences.map((experience: Experience) => (
                <FlexBox key={experience.name} direction="row" gap="10px" align="center" css={{ width: '100vw' }}>
                    <FlexBox css={{ width: '15%' }} gap="5px">
                        <StyledTypography variant="h1">{experience.name}</StyledTypography>
                        <StyledTypography variant="h3" color="gray2">{experience.position}</StyledTypography>
                        <StyledTypography variant="h3" color="gray2">{experience.period}</StyledTypography>
                    </FlexBox>
                    <div css={{ margin: '0 20px' }}>
                        <StyledTypography>{experience.description}</StyledTypography>
                    </div>
                </FlexBox>
            ))
            }
        </FlexBox >
    )
}

const Projects = ({ projects }: { projects: Project[] }) => {
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
            skills
        }
      }
    }
  }
}
`