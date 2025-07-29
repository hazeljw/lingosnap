import { Language } from "@lingosnap/shared"
import MaoriFlagIcon from "./MaoriFlagIcon"
import { mapLanguageToFlag } from "./mappers"

const LanguageFlag = ({width=27, language}:{width?:number, language:Language}) => {
    if(language === Language.TeReo) {
        return <MaoriFlagIcon width={width} /> 
    }

    return <div>{mapLanguageToFlag(language)}</div>
}

export default LanguageFlag