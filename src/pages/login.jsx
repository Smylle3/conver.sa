import {
    Avatar,
    AvatarBadge,
    Button,
    Center,
    Flex,
    Input,
    Popover,
    PopoverAnchor,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    Stack,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    IoLogoGithub,
    IoChatbubbles,
    IoAlertCircleOutline,
} from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "config/supabaseClient";

export default function Login() {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    const [texto, setTexto] = useState("Canpo da silva");
    const [loading, setLoading] = useState(false);

    const [userName, setUserName] = useState(null);
    const [user, setUser] = useState(null);

    async function loginWithGoogle() {
        try {
            setLoading(true);
            const { user, session, error } = await supabase.auth.signIn(
                {
                    provider: "google",
                },
                {
                    redirectTo: "http://localhost:3000/chat",
                }
            );
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }

    function handleSignin() {
        if (userName === null || userName.length === 0) {
            setTexto("Campo obrigatório!");
            setIsOpen(true);
        } else if (user === null || user.length === 0) {
            setTexto("Usuário inválido!");
            setIsOpen(true);
        } else {
            alert("Logando!");
        }
    }

    useEffect(() => {
        axios
            .get(`https://api.github.com/users/${userName}`)
            .then((data) => {
                if (data.login !== null) {
                    setUser(data);
                }
            })
            .catch((error) => {
                setUser(null);
                return;
            });
    }, [userName]);

    return (
        <Flex
            w="100vw"
            h="100vh"
            alignItems="center"
            bgImg="https://imagesbase.ru/file/8700/1440x900/8700_1440x900.jpg"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            <Center
                as="form"
                w="50vw"
                minW="300px"
                paddingTop={20}
                paddingBottom={20}
                bg="rgba(53,54,70,0.8)"
                borderTopRightRadius={15}
                borderBottomRightRadius={15}
                flexDirection="column"
                borderTopWidth={2}
                borderBottomWidth={2}
                borderRightWidth={2}
                borderColor="gray.100"
                boxShadow="0px 0px 20px 5px #181B23"
            >
                <Center flexDirection="row" w="90%">
                    <IoChatbubbles color="#9699B0" size="2em" />
                    <Text
                        color="gray.300"
                        fontSize="2xl"
                        fontFamily="monospace"
                        padding={5}
                        textAlign="center"
                    >
                        Bem vindo ao CONVER.SA
                    </Text>
                    <IoChatbubbles color="#9699B0" size="2em" />
                </Center>
                <Center marginBottom={5} flexDirection="column">
                    <Avatar
                        borderRadius="full"
                        boxSize="100px"
                        src={`https://github.com/${userName}.png`}
                        marginBottom={5}
                    >
                        {userName === null || userName.length === 0 ? (
                            <AvatarBadge
                                boxSize="1.25em"
                                bg="red.500"
                                borderColor="red.300"
                            />
                        ) : (
                            <AvatarBadge
                                boxSize="1.25em"
                                bg="green.500"
                                borderColor="green.300"
                            />
                        )}
                    </Avatar>
                </Center>
                <Stack spacing={1}>
                    <Popover
                        returnFocusOnClose={false}
                        isOpen={isOpen}
                        onClose={close}
                        placement="top"
                        closeOnBlur={true}
                    >
                        <PopoverAnchor>
                            <Input
                                onChange={(v) => {
                                    setUserName(v.target.value);
                                }}
                                name="GitHub"
                                type="text"
                                label="GitHub"
                                placeholder="GitHub"
                                isRequired="true"
                                borderColor="gray.900"
                                focusBorderColor="green.500"
                                _hover={{
                                    borderColor: "green.100",
                                }}
                            />
                        </PopoverAnchor>
                        <PopoverContent
                            bg="red.900"
                            borderColor="red.700"
                            color="red.300"
                            width=""
                        >
                            <PopoverArrow bg="red.300" />
                            <PopoverCloseButton />
                            <PopoverBody>
                                <IoAlertCircleOutline />
                                {texto}
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <Button
                        colorScheme="green"
                        leftIcon={<IoLogoGithub />}
                        borderColor="green.500"
                        color="green.800"
                        bgColor="green.400"
                        onClick={() => {
                            handleSignin();
                        }}
                    >
                        Entrar
                    </Button>
                    <Button
                        onClick={() => {
                            loginWithGoogle();
                        }}
                        colorScheme="blackAlpha"
                        leftIcon={<FcGoogle />}
                    >
                        Login com Google
                    </Button>
                </Stack>
            </Center>
        </Flex>
    );
}
