/* eslint-disable react/prop-types */
import {
	InputBase,
	Box,
	Paper,
	Stack,
	Typography,
	Container,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import SearchIcon from "@mui/icons-material/Search";
import { materialList } from "../utils/falist";
import { useEffect, useState } from "react";

export const ICListModal = (props) => {
	const [icFilter, setIcFilter] = useState("");
	useEffect(() => {
		console.log("Yes");
	}, [props.OpenMe]);

	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				background: "#222222dd",
				backdropFilter: "blur(5px)",
				overflowY: "auto",
				position: "absolute",
				visibility: props.OpenMe ? "visible" : "hidden",
				top: "0",
				left: "0",
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Container sx={{ padding: "20px" }}>
				<Paper
					elevation={24}
					sx={{
						background: "#222",
						position: "fixed",
						padding: "5px",
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						alignItems: "center",
					}}
				>
					<Icon
						type="button"
						aria-label="search"
					>
						<SearchIcon />
					</Icon>
					<InputBase
						sx={{ marginLeft: "10px", width: "100%" }}
						placeholder="Find thy icon..."
						onChange={(e) => {
							setIcFilter(e.target.value);
						}}
						inputProps={{ "aria-label": "search google maps" }}
					/>
				</Paper>
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						flexDirection: "row",
						alignContent: "center",
						alignItems: "center",
						justifyContent: "center",
						gap: "5px",
						marginTop: "30px",
					}}
				>
					{materialList
						.filter((ic) => ic.toLowerCase().includes(icFilter))
						.map((value, index) => {
							return (
								<Stack
									key={index}
									onClick={() => {
										props.OnDialogClose(value);
									}}
									className="iconlist"
									sx={{
										width: "100px",
										display: "inline-flex",
										padding: "20px",
										flexDirection: "column",
										margin: "0px 4px",
									}}
								>
									<Icon
										sx={{
											fontSize: "2.2rem",
											alignSelf: "center",
										}}
									>
										{value}
									</Icon>
									<Typography
										noWrap
										variant="caption"
										sx={{
											textOverflow: "ellipsis",
											textAlign: "center",
											overflow: "hidden",
											fontSize: "0.5rem",
											fontWeight: "900",
										}}
									>
										{" "}
										{value.replaceAll("_", " ")}
									</Typography>
								</Stack>
							);
						})}
				</Box>
			</Container>
		</Box>
	);
};
