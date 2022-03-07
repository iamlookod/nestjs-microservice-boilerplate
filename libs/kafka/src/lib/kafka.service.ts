import { ITopicConfig } from 'kafkajs';

export const createTopic = (
  initTopics: string[],
  listTopics: string[],
  isReply = false
): ITopicConfig[] => {
  let listTopicsFilter: string[] = [];
  let prefix = '';

  if (isReply) {
    listTopicsFilter = listTopics.filter(
      (topic) => topic.indexOf('.reply') > 0
    );
    prefix = '.reply';
  } else {
    listTopicsFilter = listTopics.filter(
      (topic) => topic.indexOf('.reply') === -1
    );
  }

  const events = initTopics.filter(
    (topic) => !listTopicsFilter.includes(topic + prefix)
  );

  const topics: ITopicConfig[] = events.map((event) => {
    return {
      topic: isReply ? `${event}${prefix}` : event,
      numPartitions: 3,
      replicationFactor: 3,
    };
  });
  return topics;
};
