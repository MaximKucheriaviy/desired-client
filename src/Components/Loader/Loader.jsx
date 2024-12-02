import { ThreeDots } from "react-loader-spinner";
import { Box } from "@mui/material";
import MainTheme from "@/theme/mainTheme";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const Loader = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true); // Показать лоадер
    const handleComplete = () => setLoading(false); // Скрыть лоадер

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Удаляем обработчики при размонтировании компонента
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  if (!loading) {
    return <></>;
  }
  return (
    <Box
      position={"fixed"}
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backdropFilter: "blur(5px) brightness(0.5)",
        zIndex: "1000",
      }}
    >
      <ThreeDots color={MainTheme.palette.primary.main} />
    </Box>
  );
};
