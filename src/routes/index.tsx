import { createEffect, createSignal, For } from "solid-js"
import { rosConnection } from "~/lib/app"

export default function Home() {
  const [connectionStatus, setConnectionStatus] = createSignal("N/A")
  const [connection, setConnection] = createSignal(false)
  const [messagesData, setMessagesData] = createSignal([] as any[])

  createEffect(() => {
    rosConnection(setConnectionStatus, setConnection, setMessagesData)
  })

  return (
    <main>
      <h1>Rosbridge demo</h1>

      <p>To see this page update:</p>
      <ul>
        <li>
          Run a Rosbridge connection at <code>ws://localhost:9090</code>
        </li>
        <li>
          Start publishing ROS messages to <code>/my_topic</code>
        </li>
      </ul>

      <p>
        View the full tutorial at{" "}
        <a
          href="https://foxglove.dev/blog/using-rosbridge-with-ros1"
          target="_blank"
        >
          Using Rosbridge with ROS 1
        </a>{" "}
        or{" "}
        <a
          href="https://foxglove.dev/blog/using-rosbridge-with-ros2"
          target="_blank"
        >
          Using Rosbridge with ROS 2
        </a>
        .
      </p>

      <hr />
      <div
        id="statusIndicator"
        style={{ "background-color": connection() ? "green" : "red" }}
      >
        {connection() ? "Connected" : "Disconnected"}
      </div>
      <p>
        Connection:{" "}
        <span id="status" style="font-weight: bold;">
          {connectionStatus()}
        </span>
      </p>
      <div>
        <code>/my_topic</code> messages received:{" "}
        <ul id="messages" style="font-weight: bold;">
          <For each={messagesData()}>
            {(data) => (
              <li>
                <p>{data}</p>
              </li>
            )}
          </For>
        </ul>
      </div>
    </main>
  )
}
