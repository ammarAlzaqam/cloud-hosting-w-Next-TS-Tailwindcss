import { CommentDocument } from "@/models/comment";
import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export const DeleteComment = async (comment: CommentDocument, router: any) => {
  try {
    if (confirm("You want delete this comment, Are you sure.")) {
      await axios.delete(`${API_DOMAIN}/comments/${comment._id}`);
      router.refresh();
      toast.success("Comment deleted successfully");
    }
  } catch (e: any) {
    console.error("Error in delete comment");
    toast.error(e?.response?.data.message);
  }
};

export const EditComment = async (
  comment: CommentDocument,
  text: string,
  router: any,
  setOpenEdit: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (!text) return toast.info("The text is required");
    if (comment.text === text)
      return toast.info("The text hasn't been changed");
    setLoading(true);
    await axios.patch(`${API_DOMAIN}/comments/${comment._id}`, { text });
    router.refresh();
    // await new Promise((resolve, reject) => setTimeout(() => resolve(""), 200))
    setLoading(false);
    setOpenEdit(false);
    toast.success("Comment updated successfully");
  } catch (e: any) {
    setLoading(false);
    console.error("Error in update comment");
    toast.error(e?.response?.data.message);
  }
};
