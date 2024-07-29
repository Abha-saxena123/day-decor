import { DocumentPreview } from "../common/components/preview-document"

export const Documents = (id: 'PrivacyPolicy' | "TermsAndCondition") => {
    return <DocumentPreview file="http://localhost:3000/privacy-policy.pdf" />
}