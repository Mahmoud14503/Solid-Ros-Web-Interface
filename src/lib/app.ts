import * as ROSLIB from 'roslib';
import { Setter } from 'solid-js';

function rosConnection(
  setConnectionStatus: Setter<string>,
  setConnection: Setter<boolean>,
  setMessagesData: Setter<any[]>
) {
  // Create ros object to communicate over your Rosbridge connection
  const ros = new ROSLIB.Ros({ url: 'ws://localhost:9090' });

  // When the Rosbridge server connects, fill the span with id "status" with "successful"
  ros.on('connection', () => {
    setConnectionStatus('successful');
    setConnection(true);
  });

  // When the Rosbridge server experiences an error, fill the "status" span with the returned error
  ros.on('error', (error) => {
    setConnectionStatus(`errored out (${error})`);
  });

  // When the Rosbridge server shuts down, fill the "status" span with "closed"
  ros.on('close', () => {
    setConnectionStatus('closed');
  });

  // Create a listener for /my_topic
  const my_topic_listener = new ROSLIB.Topic({
    ros,
    name: '/my_topic',
    messageType: 'std_msgs/String',
  });
  const imu_listener = new ROSLIB.Topic({
    ros,
    name: '/imu',
    messageType: 'sensor_msgs/msg/Imu',
  });
  const odometry_filtered_global_listener = new ROSLIB.Topic({
    ros,
    name: '/odometry/filtered/global',
    messageType: 'nav_msgs/Odometry',
  });
  // -------------------------------------------
  my_topic_listener.subscribe((message) => {
    // data is the key inside my_topic masseges
    setMessagesData((e) => [...e, (message as any).data]);
  });
  // -------------------------------------------
  // turn on the sumulation to publish messages
  imu_listener.subscribe((message) => {
    // setMessagesData((e) => [...e, JSON.stringify(message)]);
    // console.log(message);
  });
  // -------------------------------------------
  odometry_filtered_global_listener.subscribe((message) => {
    // setMessagesData((e) => [...e, JSON.stringify(message)]);
    console.log(message);
  });
}

export { rosConnection };
