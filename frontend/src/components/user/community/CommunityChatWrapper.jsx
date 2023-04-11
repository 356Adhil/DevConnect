import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommunityChat from './CommunityChat';

function CommunityChatWrapper({ location }) {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      if (!location?.state?.username || !location?.state?.room || !location?.state?.communityName || !location?.state?.communityMembers || !location?.state?.communityId) {
        navigate(`/community/${id}`);
      }
    }, [location, navigate, id]);

    const { socket, username, room, communityName, communityMembers, communityId } = location?.state || {};
  
    return (
        <CommunityChat socket={socket} username={username} room={room} communityName={communityName} communityMembers={communityMembers} communityId={communityId} />
    );
}

export default CommunityChatWrapper;
