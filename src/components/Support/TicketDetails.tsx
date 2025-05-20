import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Select } from "antd";
import { FaEdit } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


interface SupportDataType {
  key: React.Key;
  id: string;
  title: string;
  createdBy: string;
  createdOn: string;
  status: "Open" | "Closed" | "Rejected";
  text?: string;
}

const TicketDetails: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string, fromUser: boolean, fileName?: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [isQuillActive, setIsQuillActive] = useState(true);

  

  const location = useLocation();
  const { ticket } = location.state as { ticket: SupportDataType };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSendMessage = () => {
    const strippedMessage = newMessage.replace(/<\/?p>/g, "");
    setMessages([...messages, { text: strippedMessage, fromUser: true, fileName }]);
    setNewMessage("");
    setFileName("");
    setIsQuillActive(false);
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="w-full h-auto">
        <hr />
        <div className="p-4 pt-4">
          <div className="bg-white p-4 border border-gray-300 rounded-lg ">
            <div className="flex justify-between">
              <div className="text-2xl font-bold">#{ticket.id}</div>
            </div>
            <div className="flex border border-gray-300 rounded-xl p-3 gap-5 h-full w-full">
              <div className="flex flex-col w-[70%]">
                <div className="flex justify-between w-full">
                  <div className="flex gap-3">
                    <img
                      alt="User Avatar"
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="rounded-full h-10 w-10"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold">{ticket.createdBy}</div>
                      <div className="text-sm text-blue-500">user@abc.com</div>
                      <div className="pt-4">125DD</div>
                    </div>
                  </div>
                  <FaEdit className="text-blue-500" />
                </div>
                <hr className="mt-4 mb-4" />
                {isQuillActive ? (
                  <>
                    <ReactQuill
                      value={newMessage}
                      onChange={setNewMessage}
                      theme="snow"
                      className="h-72"
                    />
                    <div className="mt-16 justify-end flex gap-2">
                      <label
                        htmlFor="fileInput"
                        className="inline-block cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 border border-gray-300 rounded-l hover:bg-gray-300 transition"
                      >
                        Browse
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                      />
                      <input
                        type="text"
                        value={fileName}
                        readOnly
                        className="w-40 px-3 py-2 border-t border-r border-b border-gray-300 rounded-r"
                        placeholder="No file selected"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 h-72 overflow-auto">
                      {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.fromUser ? "justify-end" : "justify-start"}`}>
                          <div className={`flex items-center gap-2 ${msg.fromUser ? "flex-row-reverse" : ""}`}>
                            <img
                              alt="User Avatar"
                              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              className="rounded-full h-8 w-8"
                            />
                            <div className={`p-2 rounded-md max-w-xs ${msg.fromUser ? "bg-blue-200" : "bg-gray-200"}`}>
                              {msg.text}
                              {msg.fileName && <div className="text-xs text-gray-500 mt-1">{msg.fileName}</div>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                        placeholder="Enter your message"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                      >
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>

              <span className="h-full w-[2px] bg-gray-200" />

              <div className="flex flex-col gap-2 w-[40%]">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">Ticket Details</div>
                  <Select value={ticket.status} style={{ width: 120 }} disabled>
                    <Select.Option value="Open">Open</Select.Option>
                    <Select.Option value="Closed">Closed</Select.Option>
                    <Select.Option value="Rejected">Rejected</Select.Option>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Ticket Id</div>
                    <div className="text-sm">{ticket.id}</div>
                    <hr />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Client</div>
                    <div className="text-sm">{ticket.createdBy}</div>
                    <hr />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="text-sm">s@gmail.com</div>
                    <hr />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Name</div>
                    <div className="text-sm">{ticket.createdBy}</div>
                    <hr />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Created on</div>
                    <div className="text-sm">{ticket.createdOn}</div>
                    <hr />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-gray-400">Ticket lifespan</div>
                    <div className="text-sm">
                      26 days, 10 hours, 15 minutes and 12 seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
   
  );
};

export default TicketDetails;
