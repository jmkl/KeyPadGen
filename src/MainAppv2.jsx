import {
	Box,
	Grid,
	Container,
	Button,
	Stack,
	FormControlLabel,
	LinearProgress,
	Checkbox,
	Typography,
	IconButton,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { KeyGrid } from './component/KeyGrid';
import { useEffect, useState } from 'react';
import { buildString } from './utils/datautil';
import { JCode } from './component/JCode';
import html2canvas from 'html2canvas';
import Icon from '@mui/material/Icon';
import { materialList } from './utils/falist';
import './css/mainv2.css';
import { ICListModal } from './component/ICListModal';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';

function downloadObjectAsJson(exportObj, exportName) {
	var dataStr =
		'data:text/json;charset=utf-8,' +
		encodeURIComponent(JSON.stringify(exportObj, null, "\t"));
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute('href', dataStr);
	downloadAnchorNode.setAttribute('download', exportName + '.json');
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

export const MainAppv2 = () => {
	const [klist, setKlist] = useState([]);
	const [load, setLoad] = useState('Loading...');
	const [isLoad, setIsLoad] = useState(false);
	const KEYITEM = 'keyitems';
	const [generateKey, setGenerateKey] = useState('Do some magic...');
	const [genBtn, setGenBtn] = useState('Generate');
	const [dl, setDl] = useState(false);
	const [icColor, setIcColor] = useState('#fff');
	const [open, setOpen] = useState(false);
	const [currentIconIndex, setCurrentIconIndex] = useState(-1);
	const [progress, setProgress] = useState("none")
	let tout = null;

	useEffect(() => {
		setLoad('');
		setIsLoad(true);
	}, []);

	useEffect(() => {
		if (klist.length > 0) {
			localStorage.setItem(KEYITEM, JSON.stringify(klist));
		}
	}, [klist]);

	useEffect(() => {
		if (!isLoad) {
			setKlist([]);
			return;
		}

		const items = JSON.parse(localStorage.getItem(KEYITEM));

		if (items && items.length > 0) {
			setKlist(items);
		} else {
			for (let index = 0; index < 16; index++) {
				setKlist((klist) => [
					...klist,
					{
						name: `Key${index + 1}`,
						icon: '',
						id: index,
						keys: [],
					},
				]);
			}
		}
	}, [load]);

	const promiseState = (state, color) => {
		new Promise(resolve => {


			resolve(state(color))

		})
	}

	function handleColorChange(color) {

		if (tout) {
			window.clearTimeout(tout);


		}
		tout = window.setTimeout(async () => {

			promiseState(setIcColor, color)


		}, 300);
	}

	const colorstyle = {
		color: {
			color: icColor,
		},
	};

	return (
		<Container
			sx={{
				paddingTop: '50px',
				height: '100%',
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "row", padding: "30px" }}>

				<Box
					sx={{
						marginBottom: '20px',
						display: 'flex',
						flexGrow: 0,
						justifyItems: 'center',
						alignItems: 'center',
						justifyContent: 'flex-start',
						width: '100%',
					}}
				>
					<Grid
						id="keypad"
						sx={{
							background: 'transparent',
							width: '400px',
							height: '400px',
						}}
						container
					>
						{klist.map((value, index) => {
							return (
								<Grid sx={{ zIndex: `${100 - index}` }} key={index} item xs={3}>
									<Stack className="stack" spacing={1}>
										<Icon
											style={colorstyle.color}
											sx={{
												fontSize: '2.2rem',
											}}
										>
											{value.icon}
										</Icon>

										{/**<FontAwesomeIcon size="2x" icon={value.icon ? value.icon : ['fab', value.icon]} />*/}
										<Typography
											variant="caption"
											style={colorstyle.color}
											sx={{
												fontSize: '0.5rem',
												fontWeight: '900',
											}}
										>
											{' '}
											{value.name.toUpperCase()}
										</Typography>
									</Stack>
								</Grid>
							);
						})}
					</Grid>
				</Box>
				<JCode elevation={2}>
					<pre>
						<code>{generateKey}</code>
					</pre>
				</JCode>
			</Box>

			<Stack
				direction="row"
				spacing={3}
				sx={{
					marginBottom: '20px',
					display: 'flex',
					flexGrow: 1,
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				<Button
					color="success"
					variant="outlined"
					size="small"
					onClick={() => {
						setKlist((klist) => [...klist]);
						setGenBtn('Generate');
					}}
				>
					Save
				</Button>
				<Button
					color="success"
					variant="outlined"
					size="small"
					onClick={() => {
						const keypack = buildString(klist);
						setGenerateKey(keypack);
						navigator.clipboard.writeText(keypack);
						setGenBtn('Copied');
						if (dl) downloadObjectAsJson(klist, 'hello.json');
					}}
				>
					{genBtn}
				</Button>
				<Button
					color="success"
					variant="outlined"
					size="small"
					onClick={() => {
						html2canvas(document.getElementById('keypad'), {
							backgroundColor: null,
							allowTaint: true,
							useCORS: true,
						}).then(function (canvas) {
							var link = document.createElement('a');
							link.download = 'keypad_.png';
							link.href = canvas.toDataURL('image/png');
							link.click();
						});
					}}
				>
					Download Image
				</Button>
				<IconButton aria-label="delete" color="success" size="small">
					<label size="small" htmlFor="raise-button-file">
						<FileUploadOutlined />
					</label>
					<input
						type="file"
						hidden
						id="raise-button-file"
						onChange={(e) => {
							var fr = new FileReader();
							fr.onload = function () {
								setKlist(JSON.parse(fr.result));
							};
							fr.readAsText(e.target.files[0]);
						}}
					/>
				</IconButton>
				<FormControlLabel
					control={
						<Checkbox
							color="success"
							size="small"
							checked={dl}
							onChange={(ev) => setDl(ev.target.checked)}
						/>
					}
					label="Download config"
				/>
				<MuiColorInput
					format="hex"
					size="small"
					variant="outlined"
					value={icColor}
					onChange={handleColorChange}
				/>
			</Stack>
			<LinearProgress sx={{ display: progress }} color="success" />
			<Box sx={{ flexGrow: 1, transform: 'scale(0.9)' }}>
				<Grid container spacing={1}>
					{klist.map((value, index) => {
						return (
							<KeyGrid
								idx={index}
								iconList={materialList}
								GetIcon={(id) => {
									setCurrentIconIndex(id);
									setOpen(true);
								}}
								Keys={klist[index]}
								key={index}
								// eslint-disable-next-line prettier/prettier
								onEdit={() => { }}
							/>
						);
					})}
				</Grid>
			</Box>
			<Box
				sx={{
					pointerEvents: "none",
					width: '100%',
					height: '100%',
					position: 'absolute',
					top: '0',
					left: '0',
					display: 'flex',
				}}
			>

			</Box>

			<ICListModal
				OpenMe={open}
				IconIndex={currentIconIndex}
				OnDialogClose={(result) => {
					console.log(result);
					klist[currentIconIndex].icon = result;
					setKlist((klist) => [...klist]);
					setOpen(false);
				}}
			/>
		</Container>
	);
};
