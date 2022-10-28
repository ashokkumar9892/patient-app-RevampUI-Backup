import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { makeStyles } from "@material-ui/styles";
import DummyImg from "../assets/images/dummy.svg"
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'Patient Name',
        headerName: 'Patient Name',
        width: 150,
        editable: true,
    },
    {
        field: 'DOB',
        headerName: 'DOB',
        width: 150,
        editable: true,
    },
    {
        field: 'Chart#',
        headerName: 'Chart#',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Provider',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
        field: 'End Time',
        headerName: 'End Time',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Appt. Type',
        headerName: 'Appt. Type',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Appt.',
        headerName: 'Appt',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Pre',
        headerName: 'Pre',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Insurance',
        headerName: 'Insurance',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'E&B',
        headerName: 'E&B',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'D',
        headerName: 'D',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Copy',
        headerName: 'Copy',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Paid',
        headerName: 'Paid',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'Balance',
        headerName: 'Balance',
        type: 'number',
        width: 110,
        editable: true,
    },

];

const rows = [
   
];

export default function CheckedIn() {
    const useStyles = makeStyles((theme) => ({
        root: {
            "& .MuiDataGrid-columnHeaderCheckbox": {
                display: "block",
                pointerEvents: "none",
                disabled: "disabled",
            },
            "& .MuiDataGrid-columnHeaderWrapper": {
                backgroundColor: "#0c71c3",
                color: "white",
                lineHeight: "unset !important",
                maxHeight: "none !important",
                whiteSpace: "normal",
                minWidth: "normal",
                textAlign: "center",
            },
            "& .MuiDataGrid-cell": {
                border: "1px solid #dfdddd",
                lineHeight: "unset !important",
                maxHeight: "none !important",
                whiteSpace: "normal",
                textAlign: "center",
                paddingTop: "1em",
                paddingBottom: "1em"
            },
            "& .MuiDataGrid-row.Mui-odd": {
                backgroundColor: "#e9e9e9",
            },
            "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#0c71c3",
                color:"#fafafa"
            },
            "& .MuiDataGrid-columnHeaderTitle": {
                overflow: "visible",
                lineHeight: "1.43rem",
                whiteSpace: "normal",
                textAlign: "center",
            },

            "& .MuiDataGrid-root": {
                overflow: "visible",
                lineHeight: "1.43rem",
                whiteSpace: "normal",
                textAlign: "center",

            }

        },
    }));

    function CustomNoRowsOverlay() {
        return (
            <div style={{ display: "flex", alignItems: "center", height:"100%", width: "50%", paddingLeft: "10px", flexDirection: "row" }}>
            <img height={200} width={200} src={DummyImg} />
            <p style={{fontWeight:"bold", fontStyle:"italic"}}> There are currently no checked-in patients for todays. </p>
        </div>
        );
      }

    const classes = useStyles();
    return (
        <>
            <div>
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                   Missed Appointments
                </p>

            </div>
            <Box className={classes.root} sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    className={useStyles().root}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{
                        NoRowsOverlay: CustomNoRowsOverlay,
                      }}
                    // checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}

                />
              
            </Box>
            
        </>);
}
