import {
    Center,
    Flex,
    IconButton,
    Textarea,
    Box,
    Avatar,
    Button,
} from "@chakra-ui/react";
import { supabase } from "config/supabaseClient";
import React, { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Chat() {
    const [myMensagem, setMyMensagem] = useState("");
    const [isSession, setIsSession] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    //const [myMsg, setMyMsg] = useState(false);
    const [listMsg, setListMsg] = useState([]);

    function verLogin() {
        const session = supabase.auth.session();
        if (session !== null) {
            setIsSession(session);
            let usuario = session.user.identities[0];
            setAvatarUrl(usuario.identity_data.avatar_url);
        }
        console.log(isSession);
    }

    async function signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            alert("Voce deslogou!");
        } catch (error) {
            alert(error.message);
        }
    }

    function newMsg() {
        const dataMsg = {
            id: listMsg.length,
            from: "User",
            text: myMensagem,
        };
        setListMsg([...listMsg, dataMsg]);
        setMyMensagem("");
    }

    return (
        <Center
            w="100vw"
            h="100vh"
            bgImg="https://imagesbase.ru/file/8700/1440x900/8700_1440x900.jpg"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            <Flex
                w="90vw"
                minW="300px"
                h="90vh"
                borderRadius={5}
                padding="10px 10px"
                bg="rgba(53,54,70, 0.5)"
            >
                <Flex
                    as="form"
                    flexDirection="column"
                    w="80%"
                    minW="300"
                    borderRadius={10}
                    bg="rgba(53,54,70,0.5)"
                >
                    <Flex
                        h="90%"
                        overflowY="scroll"
                        flexDirection="column-reverse"
                        alignItems="end"
                        padding="10px 15px"
                        css={{
                            "&::-webkit-scrollbar": {
                                width: "5px",
                            },
                            "&::-webkit-scrollbar-track": {
                                width: "5px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: "#181B23",
                                borderRadius: "25px",
                            },
                        }}
                    >
                        <Flex
                            flexDirection="column"
                            padding="0px 0px"
                            w="100%"
                            alignItems="end"
                        >
                            {listMsg.map((msgAtual) => {
                                return (
                                    <Box
                                        border="1px solid"
                                        margin="5px 0px"
                                        padding="10px 15px"
                                        borderRadius={9}
                                        borderBottomRightRadius={0}
                                        maxW="60%"
                                        key={msgAtual.id}
                                    >
                                        <Avatar
                                            size="xs"
                                            name="User"
                                            src={avatarUrl}
                                            marginRight={3}
                                        />
                                        {msgAtual.text}
                                    </Box>
                                );
                            })}
                        </Flex>
                    </Flex>

                    <Center h="10%" padding={2} bg="gray.600">
                        <Textarea
                            value={myMensagem}
                            onChange={(m) => {
                                setMyMensagem(m.target.value);
                            }}
                            onKeyDownCapture={(k) => {
                                if (k.key === "Enter") {
                                    k.preventDefault();
                                    newMsg(myMensagem);
                                }
                            }}
                            name="Mensagem"
                            type="text"
                            label="Mensagem"
                            placeholder="Mensagem..."
                            border="0 none"
                            bg="gray.800"
                            color="gray.400"
                            resize="none"
                            rows={1}
                            maxH={20}
                            css={{
                                "&::-webkit-scrollbar": {
                                    width: "5px",
                                },
                                "&::-webkit-scrollbar-track": {
                                    width: "5px",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    background: "#4B4D63",
                                    borderRadius: "25px",
                                },
                            }}
                        />
                        <IconButton
                            colorScheme="green"
                            aria-label="Send email"
                            icon={<BiMailSend />}
                            onClick={(event) => {
                                event.preventDefault();
                                newMsg();
                            }}
                        />
                    </Center>
                </Flex>
                <Center flexDirection="column" w="20%" minW="50px" h="100%">
                    <Link to="/">
                        <Button
                            variant="outline"
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Sair
                        </Button>
                    </Link>
                </Center>
            </Flex>
        </Center>
    );
}
