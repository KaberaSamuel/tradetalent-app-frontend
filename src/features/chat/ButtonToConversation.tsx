import type { ConversationTypes, UserTypes } from "@/App.types";
import { authSelector } from "@/features/auth/authSlice";
import { createConversationApi } from "@/features/chat/api";
import { updateActiveConvesation } from "@/features/chat/chatSlice";
import { updateActiveTab } from "@/features/navigation/navigationSlice";
import { updatePopupMessage } from "@/features/popups/messageSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { mdiMessageOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Props {
  otherUser: UserTypes;
  iconSize: number;
}

export default function ButtonToConversation({ otherUser, iconSize }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  function createConversationName(slug: string) {
    const slugsAlph = [auth.user.slug, slug].sort();
    return `${slugsAlph[0]}__${slugsAlph[1]}`;
  }

  // create conversation model in the db before navigating its route
  async function createConversation() {
    const conversationName = createConversationName(otherUser.slug);
    const response = await createConversationApi(
      auth.token.access,
      conversationName
    );
    if (response.status === 201) {
      // Reset fetch conversations query to trigger a refetch that will include the newly created conversation
      queryClient.resetQueries({
        queryKey: ["fetch-conversations"],
      });

      const conversation: ConversationTypes = response.data.conversation;
      dispatch(updateActiveTab("chats"));
      dispatch(updateActiveConvesation(conversation));
      navigate(`/chats/${conversationName}`);
    } else {
      dispatch(updatePopupMessage("Failed to open the chat"));
    }
  }

  return (
    <>
      <button
        className={
          "w-fit py-2 px-4 text-sm sm:text-base text-white flex gap-2 items-center rounded-xl bg-teal-500"
        }
        onClick={createConversation}
      >
        <Icon path={mdiMessageOutline} size={iconSize} />
        <p>Message {otherUser.first_name}</p>
      </button>
    </>
  );
}
