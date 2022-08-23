import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Navigation() {
    return (
      <div>
        navigation
        <Outlet />
      </div>
    );
}
