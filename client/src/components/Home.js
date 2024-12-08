import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { VscRunAll } from "react-icons/vsc";
import CodeEditor from './CodeEditor';

const Home = (props) => {
    return (
        <>
            <div>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: 'black' }}>File</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">*</span>
                                    <input type="text" className="form-control" placeholder="Enter the File Name" aria-label="Username" aria-describedby="addon-wrapping" />
                                </div>
                                <div className="input-group mb-3 my-2">
                                    <label className="input-group-text" for="inputGroupSelect01">Options</label>
                                    <select className="form-select" id="inputGroupSelect01">
                                        <option selected>Choose...</option>
                                        <option value="1">Python</option>
                                        <option value="2">Java</option>
                                        <option value="3">C</option>
                                        <option value="3">C++</option>
                                        <option value="3">Javascript</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='homePage'>
                    <div className='left'>
                        <h5 style={{ padding: "10px 10px", textAlign: "center" }}>Files</h5>
                        <div className='line' style={{ backgroundColor: props.mode === "dark" ? "white" : "black" }}></div>
                        <div className='listFile'>
                            <li style={{ borderBottom: props.mode === "light" ? "1px solid black" : "1px solid white" }}><span>File 1</span><MdDelete /></li>
                            <li style={{ borderBottom: props.mode === "light" ? "1px solid black" : "1px solid white" }}><span>File 1</span><MdDelete /></li>
                            <li style={{ borderBottom: props.mode === "light" ? "1px solid black" : "1px solid white" }}><span>File 1</span><MdDelete /></li>
                            <li style={{ borderBottom: props.mode === "light" ? "1px solid black" : "1px solid white" }}><span>File 1</span><MdDelete /></li>
                        </div>
                        <div className='addButton' >
                            <FaCirclePlus size={25} style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModal" />
                        </div>
                    </div>
                    <div className='middle'>
                        <div className='middletop'>
                            <h5>Code</h5>
                            <VscRunAll className='runCode' size={25} />
                        </div>
                        <div className='line' style={{ backgroundColor: props.mode === "dark" ? "white" : "black" }}></div>
                        <CodeEditor />
                    </div>
                    <div className='right'>
                        <h5 style={{ padding: "10px 10px", textAlign: "center" }}>Output</h5>
                        <div className='line' style={{ backgroundColor: props.mode === "dark" ? "white" : "black" }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
