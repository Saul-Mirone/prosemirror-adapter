/* Copyright 2021, Prosemirror Adapter by Mirone. */
import { createElement, FC, useContext } from 'react';

import { nodeViewContext } from './nodeViewContext';

export const NodeViewContent: FC<{ as: string }> = ({ as }) => {
    const { contentRef } = useContext(nodeViewContext);

    return createElement(as, { ref: contentRef });
};
