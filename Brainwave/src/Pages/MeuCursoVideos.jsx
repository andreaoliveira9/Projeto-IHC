import Navbar from '../Components/Navbar'
import { useParams, Link } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import { useState, useContext, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player'
import image from '../Images/novoutilizador.jpg';
import { UserContext } from '../Contexts/UserContext';

function MeuCursoVideos() {
    const { courseId, videoId } = useParams();
    
    const { data: course, error, isPending } = useFetch('http://localhost:3000/courses/' + courseId);
    
    const {userType, setUserType} = useContext(UserContext);
    const [user, setUser] = useState(null);

    // comment section variables (sim está um caos)
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [submitReply, setSubmitReply] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [showReplyBox2, setShowReplyBox2] = useState(false);
    const [submitReply2, setSubmitReply2] = useState(null);
    const [replyContent2, setReplyContent2] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const [disabledButton2, setDisabledButton2] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [submitComment, setSubmitComment] = useState(false);
    const [emptyCommentError, setEmptyCommentError] = useState(false);
    const [emptyReplyError, setEmptyReplyError] = useState(false);
    const [emptyReplyError2, setEmptyReplyError2] = useState(false);

    //refBox
    const replyBoxRef = useRef({});


    // Mocked comments
    const commentList = [
        { id: 1, user: 'Martim Correia', comment: 'Não entendi muito bem o que foi dito no minuto 3:23, poderia explicar melhor?' },
        { id: 2, user: 'Carlos Alberto', comment: 'Gostei do video, bastante claro e explicativo' },
        //...
    ];

    useEffect(() => {
        if(userType === 'student' && course) {
            setUser("Estudante Guest");
        } 
        else if (userType === 'teacher' && course) {
            setUser("Professor " + course.prof);
        }
    }, [userType, course]);
    
        


    const handleReply = () => {
        setShowReplyBox(!showReplyBox);
    }

    const handleSubmitReply = () => {
        if (!replyContent.trim()) {
            setEmptyReplyError(true);
            setTimeout(() => {
                setEmptyReplyError(false);
            }, 3000);
        } else {
            setShowReplyBox(!showReplyBox);
            setSubmitReply(!submitReply);
            setDisabledButton(true);
        }
    }

    const handleKeyPressReply = (event) => {
        if(event.key === 'Enter' && !event.shiftKey){
            event.preventDefault();
            handleSubmitReply();
        }
    }

    const handleReply2 = () => {
        setShowReplyBox2(!showReplyBox2);
        if(!showReplyBox2){
            setTimeout(() => { 
                replyBoxRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    const handleSubmitReply2 = () => {
        if (!replyContent2.trim()) {
            setEmptyReplyError2(true);
            setTimeout(() => {
                setEmptyReplyError2(false);
            }, 3000);
        } else {
            setShowReplyBox2(!showReplyBox2);
            setSubmitReply2(!submitReply2);
            setDisabledButton2(true);
        }
    }

    const handleKeyPressReply2 = (event) => {
        if(event.key === 'Enter' && !event.shiftKey){
            event.preventDefault();
            handleSubmitReply2();
        }
    }

    const handleSubmitComment = () => {
        if (!commentContent.trim()) {
            setEmptyCommentError(true);
            setTimeout(() => {
                setEmptyCommentError(false);
            }, 3000);
        } else {
            setSubmitComment(!submitComment);
        }
    } 


    const handleKeyPress = (event) => {
        if(event.key === 'Enter' && !event.shiftKey){
            event.preventDefault();
            handleSubmitComment();
        }
    }

  
    return (
      !isPending && (<div className='lili min-h-screen'>
          <header>
              <Navbar></Navbar>
          </header> 
          <main>
          <div className="md:mx-32 flex flex-col md:flex-row">
                <div className="w-full p-4 flex flex-col">
                    <div className="w-full mb-4">
                        <h1 className="text-3xl font-bold">{ course.name }</h1>
                        <div className='pt-5 w-full' style={{ height: '68.5vh' }}>
                            <ReactPlayer 
                                key={videoId}
                                url={course.videoDefault}
                                controls="true"
                                width='100%'
                                height='100%'
                            />
                        </div>
                    </div>

                    <div className="w-full flex-grow">
                        {course.videos.map((video) => (
                            video.id === Number(videoId) && (
                                <h1 className="text-3xl font-bold pb-7">{video.name}</h1>
                            )
                        ))}
                        <h3 className="text-3xl font-bold mb-2 pb-3">Comentários:</h3>
                            {(!submitComment) && <div className="mb-4 bg-white shadow rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <textarea placeholder="Escreve um comentário" value={commentContent} className="w-full p-2 border border-gray-300 rounded" onChange={(e) => setCommentContent(e.target.value)} onKeyDown={handleKeyPress}></textarea>
                                    {emptyCommentError && <p className="text-red-500">Comentário vazio</p>}
                                </div>
                                <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                                    <button className="text-green-600 hover:text-green-900  text-sm font-semibold" onClick={handleSubmitComment}>Comentar</button>
                                </div>
                            </div>}
                            {(submitComment) &&
                                <div className="mb-4 bg-white shadow rounded-lg overflow-hidden">
                                    <div className="p-4">
                                        <div className='flex flex-row items-center pb-6'>
                                            <img className="w-12 h-12 object-cover rounded-full mr-4" src={image} alt="Imagem de aluno" />
                                            <h4 className="text-lg font-bold mb-2">{user}</h4>
                                        </div>
                                        <p className="text-gray-700">{commentContent}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                                        <button className="text-green-600 hover:text-green-900  text-sm font-semibold">Responder</button>
                                        <button className="px-2 text-green-600 hover:text-green-900  text-sm font-semibold" onClick={() => (setSubmitComment(false), setCommentContent(""))}>Remover</button>
                                    </div>
                                </div>
                            }
                            <div className="mb-4 bg-white shadow rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <div className='flex flex-row items-center pb-6'>
                                        <img className="w-12 h-12 object-cover rounded-full mr-4" src={image} alt="Imagem de aluno" />
                                        <h4 className="text-lg font-bold mb-2">Martim Correia</h4>
                                    </div>
                                    <p className="text-gray-700">Não entendi muito bem o que foi dito no minuto 3:23, poderia explicar melhor?</p>
                                </div>
                                <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                                    <button id="1" className="text-green-600 hover:text-green-900  text-sm font-semibold" onClick={handleReply} disabled={disabledButton}>Responder</button>
                                </div>
                            </div>
                            {(showReplyBox) &&
                                <div className="mb-4 bg-white shadow rounded-lg overflow-hidden ml-10">
                                    <div className="p-4">
                                        <textarea placeholder="Escreva a sua resposta" value={replyContent} className="w-full p-2 border border-gray-300 rounded" onChange={(e) => setReplyContent(e.target.value)} onKeyDown={handleKeyPressReply}></textarea>
                                        {emptyReplyError && <p className="text-red-500">Comentário vazio</p>}
                                    </div>
                                    <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                                        <button className="text-green-600 hover:text-green-900  text-sm font-semibold" onClick={handleSubmitReply}>Enviar Resposta</button>
                                    </div>
                                </div>
                            }
                            {(submitReply) &&
                                <div className="mb-4 bg-white shadow rounded-lg overflow-hidden ml-10">
                                    <div className="p-4">
                                        <div className='flex flex-row items-center pb-6'>
                                            <img className="w-12 h-12 object-cover rounded-full mr-4" src={image} alt="Imagem de aluno" />
                                            <h4 className="text-lg font-bold mb-2">{user}</h4>
                                        </div>
                                        <p className="text-gray-700">{replyContent}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                                        <button className="text-green-600 hover:text-green-900  text-sm font-semibold">Responder</button>
                                        <button className="px-2 text-green-600 hover:text-green-900  text-sm font-semibold" onClick={() => setSubmitReply(false)}>Remover</button>
                                    </div>
                                </div>
                            }
                            <div className="mb-4 bg-white shadow rounded-lg overflow-hidden">
                                <div className="p-4">
                                    <div className='flex flex-row items-center pb-6'>
                                        <img className="w-12 h-12 object-cover rounded-full mr-4" src={image} alt="Imagem de aluno" />
                                        <h4 className="text-lg font-bold mb-2">Carlos Alberto</h4>
                                    </div>
                                    <p className="text-gray-700">Gostei do video, bastante claro e explicativo</p>
                                </div>
                                <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                                    <button id="2" className="text-green-600 hover:text-green-900  text-sm font-semibold" onClick={handleReply2} disabled={disabledButton2}>Responder</button>
                                </div>
                            </div>
                            {(showReplyBox2) &&
                                <div className="mb-4 bg-white shadow rounded-lg overflow-hidden ml-10">
                                    <div className="p-4">
                                        <textarea placeholder="Escreva a sua resposta" value={replyContent2} className="w-full p-2 border border-gray-300 rounded" onChange={(e) => setReplyContent2(e.target.value)} onKeyDown={handleKeyPressReply2} ref={replyBoxRef}></textarea>
                                        {emptyReplyError2 && <p className="text-red-500">Comentário vazio</p>}
                                    </div>
                                    <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                                        <button className="text-green-600 hover:text-green-900  text-sm font-semibold" onClick={handleSubmitReply2}>Enviar Resposta</button>
                                    </div>
                                </div>
                            }
                            {(submitReply2) &&
                                <div className="mb-4 bg-white shadow rounded-lg overflow-hidden ml-10">
                                    <div className="p-4">
                                        <div className='flex flex-row items-center pb-6'>
                                            <img className="w-12 h-12 object-cover rounded-full mr-4" src={image} alt="Imagem de aluno" />
                                            <h4 className="text-lg font-bold mb-2">{user}</h4>
                                        </div>
                                        <p className="text-gray-700">{replyContent2}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                                        <button className="text-green-600 hover:text-green-900  text-sm font-semibold">Responder</button>
                                        <button className="px-2 text-green-600 hover:text-green-900  text-sm font-semibold" onClick={() => setSubmitReply2(false)}>Remover</button>
                                    </div>
                                </div>
                            }
                    </div>
                </div>

                <div className="w-32 md:w-5/12 pl-6 pt-16">
                    <h3 className="text-xl font-bold mb-2">Lista de vídeos</h3>
                    {course.videos.map(video => (
                        <Link key={video.id} to={`/MeuCursoVideos/${course.id}/${video.id}`}>
                            <div key={video.id} className={`card lg:card-side mb-4 bg-white shadow rounded-lg overflow-hidden cursor-pointer ${Number(videoId) === video.id ? 'bg-cyan-100' : 'bg-white'} p-2`} onClick={() => handleVideoSelect(video)}>
                                <figure><img className="h-16 w-22" src={course.image} alt="Movie"/></figure>
                                <div className="p-4 flex flex-row items-center gap-2">
                                    <div>
                                        <h4 className="text-lg font-bold mb-2">{video.name}</h4>
                                        <span className="badge">{video.duração}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
          </main>
      </div>
      ))
  }
  
  export default MeuCursoVideos