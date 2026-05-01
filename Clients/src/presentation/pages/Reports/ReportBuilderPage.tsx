import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, TextField, MenuItem, Checkbox, FormControlLabel,
  Stepper, Step, StepLabel, Card, CardContent, Chip, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from "@mui/material";
import { ArrowBack, Save as SaveIcon } from "@mui/icons-material";
import {
  useReportTemplate, useCreateReportTemplate, useUpdateReportTemplate,
  useEntitySchema,
} from "../../../infrastructure/api/reports.api";
import axiosInstance from "../../../infrastructure/api/axiosInstance";

const ENTITY_TYPES = [
  { value: "risk", label: "Risks" },
  { value: "control", label: "Controls" },
  { value: "audit", label: "Audits" },
  { value: "vendor", label: "Vendors" },
  { value: "kri", label: "KRIs" },
];

const OPERATORS = [
  { value: "eq", label: "Equals" },
  { value: "ne", label: "Not Equals" },
  { value: "contains", label: "Contains" },
  { value: "gt", label: "Greater Than" },
  { value: "lt", label: "Less Than" },
  { value: "in", label: "In (comma-separated)" },
];

const steps = ["Select Entity", "Choose Columns", "Set Filters", "Preview & Save"];

export default function ReportBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [entityType, setEntityType] = useState("");
  const [selectedColumns, setSelectedColumns] = useState<{ field: string; label: string }[]>([]);
  const [filters, setFilters] = useState<{ field: string; operator: string; value: string }[]>([]);
  const [groupBy, setGroupBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isShared, setIsShared] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const { data: existing } = useReportTemplate(id || "");
  const { data: schema } = useEntitySchema(entityType);
  const createTemplate = useCreateReportTemplate();
  const updateTemplate = useUpdateReportTemplate();

  useEffect(() => {
    if (existing && isEdit) {
      setName(existing.name);
      setDescription(existing.description || "");
      setEntityType(existing.entityType);
      setSelectedColumns(existing.columns || []);
      setFilters(existing.filters || []);
      setGroupBy(existing.groupBy || "");
      setSortBy(existing.sortBy || "");
      setSortOrder(existing.sortOrder || "asc");
      setIsShared(existing.isShared);
    }
  }, [existing, isEdit]);

  const toggleColumn = (field: string, label: string) => {
    setSelectedColumns((prev) =>
      prev.find((c) => c.field === field)
        ? prev.filter((c) => c.field !== field)
        : [...prev, { field, label }]
    );
  };

  const addFilter = () => {
    if (!schema || schema.length === 0) return;
    setFilters([...filters, { field: schema[0]!.field, operator: "eq", value: "" }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handlePreview = async () => {
    try {
      const payload = { entityType, columns: selectedColumns, filters, groupBy: groupBy || null, sortBy: sortBy || null, sortOrder };
      // Save or update first, then generate
      let templateId = id;
      if (!templateId) {
        const result = await createTemplate.mutateAsync({ name: name || "Untitled", ...payload, isShared } as any);
        templateId = result.id;
      }
      const { data } = await axiosInstance.get(`/reports/${templateId}/generate?format=json`);
      setPreviewData(data.data);
    } catch {
      setPreviewData(null);
    }
  };

  const handleSave = async () => {
    const payload = {
      name,
      description: description || undefined,
      entityType,
      columns: selectedColumns,
      filters,
      groupBy: groupBy || undefined,
      sortBy: sortBy || undefined,
      sortOrder,
      isShared,
    };

    if (isEdit) {
      await updateTemplate.mutateAsync({ id: id!, ...payload } as any);
    } else {
      await createTemplate.mutateAsync(payload as any);
    }
    navigate("/reports");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate("/reports")}>Back</Button>
        <Typography variant="h1">{isEdit ? "Edit Report" : "Report Builder"}</Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Card>
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Report Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
            <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth />
            <TextField select label="Entity Type" value={entityType} onChange={(e) => setEntityType(e.target.value)} required>
              {ENTITY_TYPES.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
            </TextField>
            <FormControlLabel control={<Checkbox checked={isShared} onChange={(e) => setIsShared(e.target.checked)} />} label="Share with team" />
            <Button variant="contained" onClick={() => setActiveStep(1)} disabled={!name || !entityType}>
              Next
            </Button>
          </CardContent>
        </Card>
      )}

      {activeStep === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>Select Columns</Typography>
            {schema?.map((field) => (
              <FormControlLabel
                key={field.field}
                control={
                  <Checkbox
                    checked={!!selectedColumns.find((c) => c.field === field.field)}
                    onChange={() => toggleColumn(field.field, field.label)}
                  />
                }
                label={`${field.label} (${field.field})`}
              />
            ))}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button onClick={() => setActiveStep(0)}>Back</Button>
              <Button variant="contained" onClick={() => setActiveStep(2)}>Next</Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {activeStep === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>Filters</Typography>
            {filters.map((f, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1, mb: 1 }}>
                <TextField select label="Field" value={f.field} onChange={(e) => { const nf = [...filters]; nf[i]!.field = e.target.value; setFilters(nf); }} sx={{ minWidth: 150 }}>
                  {schema?.map((s) => <MenuItem key={s.field} value={s.field}>{s.label}</MenuItem>)}
                </TextField>
                <TextField select label="Operator" value={f.operator} onChange={(e) => { const nf = [...filters]; nf[i]!.operator = e.target.value; setFilters(nf); }} sx={{ minWidth: 130 }}>
                  {OPERATORS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </TextField>
                <TextField label="Value" value={f.value} onChange={(e) => { const nf = [...filters]; nf[i]!.value = e.target.value; setFilters(nf); }} sx={{ flex: 1 }} />
                <Button color="error" onClick={() => removeFilter(i)}>Remove</Button>
              </Box>
            ))}
            <Button onClick={addFilter} sx={{ mb: 2 }}>Add Filter</Button>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField select label="Group By" value={groupBy} onChange={(e) => setGroupBy(e.target.value)} sx={{ minWidth: 150 }}>
                <MenuItem value="">None</MenuItem>
                {schema?.map((s) => <MenuItem key={s.field} value={s.field}>{s.label}</MenuItem>)}
              </TextField>
              <TextField select label="Sort By" value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ minWidth: 150 }}>
                <MenuItem value="">Default</MenuItem>
                {schema?.map((s) => <MenuItem key={s.field} value={s.field}>{s.label}</MenuItem>)}
              </TextField>
              <TextField select label="Order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} sx={{ minWidth: 120 }}>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </TextField>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button onClick={() => setActiveStep(1)}>Back</Button>
              <Button variant="contained" onClick={() => setActiveStep(3)}>Next</Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {activeStep === 3 && (
        <Card>
          <CardContent>
            <Typography variant="h3" sx={{ mb: 2 }}>Summary</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              <Chip label={`Entity: ${entityType}`} />
              <Chip label={`Columns: ${selectedColumns.length}`} />
              <Chip label={`Filters: ${filters.length}`} />
              {groupBy && <Chip label={`Group: ${groupBy}`} />}
              {isShared && <Chip label="Shared" color="primary" />}
            </Box>

            {previewData && (
              <Box sx={{ mb: 2, maxHeight: 300, overflow: "auto" }}>
                <Alert severity="info" sx={{ mb: 1 }}>
                  {previewData.total} records found
                </Alert>
                {previewData.rows && previewData.rows.length > 0 && (
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          {Object.keys(previewData.rows[0]).map((key) => (
                            <TableCell key={key}>{key}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {previewData.rows.slice(0, 10).map((row: any, i: number) => (
                          <TableRow key={i}>
                            {Object.values(row).map((val: any, j: number) => (
                              <TableCell key={j}>{String(val ?? "--")}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button onClick={() => setActiveStep(2)}>Back</Button>
              <Button variant="outlined" onClick={handlePreview}>Preview</Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={!name || createTemplate.isPending || updateTemplate.isPending}
              >
                {(createTemplate.isPending || updateTemplate.isPending) ? "Saving..." : "Save Report"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
