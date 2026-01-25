import React, { useEffect } from 'react';
import commentBox from 'commentbox.io';

export default function CommentBox({ projectId, boxId }) {
    useEffect(() => {
        const removeCommentBox = commentBox(projectId, {
            defaultBoxId: boxId
        });

        return () => {
            removeCommentBox();
        };
    }, [projectId, boxId]);

    return (
        <div className="commentbox" id={boxId} />
    );
}
