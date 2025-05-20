import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function SingleArticleLoading() {
    return (
        <div className="overflow-height flex justify-center items-center">
            <CgSpinnerTwoAlt className="animate-spin text-5xl text-cyan-700" />
        </div>
    )
}