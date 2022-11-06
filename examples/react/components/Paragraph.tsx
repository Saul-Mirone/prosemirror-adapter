/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { nodeViewContext } from '@prosemirror-adapter/react';
import { useContext } from 'react';

export const Paragraph = () => {
    const { contentRef } = useContext(nodeViewContext);
    return <div style={{ whiteSpace: 'break-spaces' }} ref={contentRef} />;
};
