import React from 'react';
import Card from '../../general/materialComponents/Card';
import Thumbnail from '../../general/materialComponents/Thumbnail';

export default () => (
  <Card
    title="Network parameters"
    subtitle="Define here network properties"
  >
    <Thumbnail
      selected
      name="L2Conn"
      handleClick={() => {}}
    />
    <Thumbnail
      name="L5Conn"
      handleClick={() => {}}
    />
  </Card>
)