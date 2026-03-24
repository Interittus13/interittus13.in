import Giscus from '@giscus/react'
import { CONFIG } from '@/src/config/blog'

type GiscusComponentProps = {
    theme: "light" | "dark"
}

const GiscusComponent: React.FC<GiscusComponentProps> = ({theme}) => {
    const { GISCUS } = CONFIG

    if (!GISCUS.ENABLE) return null

    return (
        <Giscus
            repo={GISCUS.REPO as any}
            repoId={GISCUS.REPO_ID}
            category={GISCUS.CATEGORY}
            categoryId={GISCUS.CATEGORY_ID}
            mapping={GISCUS.MAPPING as any}
            reactionsEnabled={GISCUS.REACTIONS as any}
            emitMetadata={GISCUS.METADATA as any}
            inputPosition={GISCUS.INPUT_POSITION as any}
            lang={GISCUS.LANG as any}
            loading={GISCUS.LOADING as any}
            theme={theme}
        />
    )
}

export default GiscusComponent