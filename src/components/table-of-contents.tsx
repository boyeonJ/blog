const TableOfContents = ({ content }: { content: string }) => {
    return (
        <div
            css={{ border: '1px solid black' }}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}

export default TableOfContents