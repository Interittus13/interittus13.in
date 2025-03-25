import Giscus from '@giscus/react'
import {FC} from 'react'

type GiscusComponentProps = {
    theme: "light" | "dark"
}

const GiscusComponent: FC<GiscusComponentProps> = ({theme}) => {
    return (
        <Giscus
            repo="interittus13/"
            repoId=""
            category='comments'
            categoryId=''
            mapping='title'
            reactionsEnabled='1'
            emitMetadata='0'
            loading='lazy'
            theme={theme}
        />
    )
}

export default GiscusComponent