import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { HeaderLayout } from "../containers/HeaderLayout";
import { Restaurants } from "../containers/Restaurants";
import { RoutePaths } from "./RoutePaths";

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route index element={<Restaurants />} />
      {RoutePaths.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<HeaderLayout>{route.children}</HeaderLayout>}
        />
      ))}
    </Routes>
  )
})