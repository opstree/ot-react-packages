// import React, { useEffect, useMemo, useState } from 'react';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Skeleton from '@mui/material/Skeleton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Tooltip from '@mui/material/Tooltip';
// import { GlobalStyles } from '@mui/material';
// import { styled } from '@mui/styles';
// import moment from 'moment';
// import { Link } from 'react-router-dom';

// import AdvanceSearchFilterCombo from '../../components/genericComponents/AdvanceSearchFilter/AdvanceSearchFilterCombo';
// import BlankPage from '../../components/BlankPage';
// // import ButtonIcon from '../../components/genericComponents/ButtonIcon';
// import NewChip from '../../components/newChip/NewChip';
// import PageError from '../../components/genericComponents/Errors/PageError';
// import PageHeader from '../../components/PageHeader';
// import PaginationTwo from '../../components/PaginationTwo';
// import { usePermissions } from '../../contexts/PermissionContext';
// import { useDocumentTitle } from '../../hooks/useDocumentTitle';
// import properties from '../../properties/properties';
// import InvokeApi from '../../util/apiInvoker';
// import GenerateURL, { GenerateEndpointURL, GenerateSearchURL } from '../../util/APIUrlProvider';
// import { usePermissionLoader } from '../../util/loadPermissionsIfMissing';
// import { generatWebhookPermissionPayload } from '../../util/permissionsPayloadGenerators';
// import { usePermissionAutoLoader } from '../../util/permissionAutoLoader';
// import { arePermissionsLoaded } from '../../util/util';
// import { formatEventType, getEventStatus, getProviderMeta, getStatusMeta } from './EventListenerUtils';
// import ButtonIcon from '../../components/genericComponents/ButtonIcon';

// const PAGE_SIZE = 10;

// const getTotalPages = (count) => Math.max(1, Math.ceil(Number(count || 0) / PAGE_SIZE));

// const getPaginationUrl = (url) => {
//     if (!url) return null;
//     if (/^https?:\/\//i.test(url)) return url;
//     return `${String(properties.api.baseURL || '').replace(/\/$/, '')}/${String(url).replace(/^\//, '')}`;
// };

// const formatReceivedAt = (createdAt) => {
//     if (!createdAt || !moment(createdAt).isValid()) {
//         return { relative: 'Time unavailable', exact: 'Not provided' };
//     }

//     return {
//         relative: moment(createdAt).fromNow(),
//         exact: moment(createdAt).format('DD MMM YYYY, hh:mm A'),
//     };
// };

// const EventStatusChip = ({ status }) => {
//     const statusMeta = getStatusMeta(status);
//     return (
//         <NewChip
//             label={statusMeta.label}
//             variant={statusMeta.variant}
//             shape="standard"
//             size="sm"
//             icon={<span className={statusMeta.icon} />}
//             className="font-11 font-weight-600"
//         />
//     );
// };

// const EventTableRowSkeleton = () => (
//     <TableBodyRow>
//         <TableCell sx={{ position: 'sticky', left: 0, zIndex: 2, minWidth: 'var(--space-170)' }}>
//             <Skeleton variant="rounded" width={92} height={24} />
//             <Skeleton variant="text" width={70} height={18} sx={{ marginTop: 'var(--space-6)' }} />
//         </TableCell>
//         <TableCell sx={{ minWidth: 'var(--space-190)' }}>
//             <Skeleton variant="rounded" width={90} height={24} />
//             <Skeleton variant="text" width={120} height={18} sx={{ marginTop: 'var(--space-6)' }} />
//         </TableCell>
//         <TableCell sx={{ minWidth: 'var(--space-220)' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--space-10)' }}>
//                 <Skeleton variant="circular" width={36} height={36} />
//                 <Box>
//                     <Skeleton variant="text" width={120} height={20} />
//                     <Skeleton variant="text" width={70} height={16} />
//                 </Box>
//             </Box>
//         </TableCell>
//         <TableCell sx={{ minWidth: 'var(--space-210)' }}>
//             <Skeleton variant="text" width={140} height={20} />
//             <Skeleton variant="text" width={90} height={16} />
//         </TableCell>
//         <TableCell sx={{ minWidth: 'var(--space-180)' }}>
//             <Skeleton variant="text" width={100} height={20} />
//             <Skeleton variant="text" width={145} height={16} />
//         </TableCell>
//         <TableCell sx={{ position: 'sticky', right: 0, zIndex: 2, minWidth: 'var(--space-130)' }}>
//             <Skeleton variant="rounded" width={100} height={32} sx={{ margin: '0 auto' }} />
//         </TableCell>
//     </TableBodyRow>
// );

// const MetricCard = ({ icon, label, value, caption, tone = 'neutral', loading }) => (
//     <MetricCardRoot tone={tone}>
//         <div className="metric-icon"><span className={icon} /></div>
//         <div>
//             <div className="metric-label">{label}</div>
//             {loading ? <Skeleton variant="text" width={64} height={28} /> : <div className="metric-value">{value}</div>}
//             <div className="metric-caption">{caption}</div>
//         </div>
//     </MetricCardRoot>
// );

// const EventListenerStatusRevamp = () => {
//     const { hasPermission, permissions } = usePermissions();
//     const { autoLoadPermissions } = usePermissionAutoLoader();
//     const { loadPermissionsIfMissing } = usePermissionLoader();
//     const [state, setState] = useState({
//         loading: true,
//         inbound_events_listing: [],
//         count: 0,
//         curr_page: 1,
//         total_page: 1,
//         next: null,
//         previous: null,
//         selected_committers: [],
//         selected_repos: [],
//         selected_status: [],
//         selected_event_types: [],
//         moreAdvFilterList: ['selected_repos', 'selected_event_types'],
//         reset_filter: 0,
//         filterActive: false,
//         filterData: null,
//         error: null,
//         statusCode: null,
//     });

//     useDocumentTitle('Git Event Executions');

//     const moreFilterData = [
//         { label: 'Repository', value: 'selected_repos' },
//         { label: 'Event type', value: 'selected_event_types' },
//         { label: 'Triggered by', value: 'selected_committers' },
//         { label: 'Execution status', value: 'selected_status' },
//     ];

//     const applyListingResponse = (data, targetPage) => {
//         if (Array.isArray(data?.results)) {
//             autoLoadPermissions({
//                 list: data.results,
//                 generatorFn: generatWebhookPermissionPayload,
//                 getArgs: (item) => [item.id],
//             });
//         }

//         setState((current) => ({
//             ...current,
//             loading: false,
//             inbound_events_listing: data?.results || [],
//             count: data?.count || 0,
//             next: getPaginationUrl(data?.next),
//             previous: getPaginationUrl(data?.previous),
//             total_page: getTotalPages(data?.count),
//             curr_page: targetPage,
//             error: null,
//             statusCode: null,
//         }));
//     };

//     const applyListingError = (error, statusCode) => {
//         setState((current) => ({
//             ...current,
//             loading: false,
//             error,
//             statusCode,
//         }));
//     };

//     const fetchInboundEvents = (filterData = null, url = null, targetPage = 1) => {
//         let endpoint = GenerateURL({}, properties.api.webhook_event_apis.inbound_events_url);
//         if (filterData && Object.keys(filterData).length > 0) endpoint = GenerateSearchURL(filterData, endpoint);
//         if (url) endpoint = url;

//         setState((current) => ({
//             ...current,
//             loading: true,
//             error: null,
//             filterData,
//         }));

//         InvokeApi(
//             { endPoint: endpoint, httpMethod: 'GET', httpHeaders: { 'Content-Type': 'application/json' } },
//             (data) => applyListingResponse(data, targetPage),
//             applyListingError
//         );
//     };

//     useEffect(() => {
//         const targetUrl = GenerateEndpointURL({}, properties.api.webhook_event_apis.inbound_events_url);
//         const permissionPayload = [{ method: 'GET', url: targetUrl }];
//         const loadExecutions = () => {
//             if (hasPermission('GET', targetUrl)) {
//                 fetchInboundEvents();
//             }
//         };

//         if (arePermissionsLoaded(permissions, permissionPayload)) loadExecutions();
//         else loadPermissionsIfMissing(permissionPayload, loadExecutions);
//     }, []);

//     const buildFilterData = (updated) => {
//         const filterData = {};
//         if (updated.selected_committers?.length) filterData.user_name = updated.selected_committers.join(',');
//         if (updated.selected_repos?.length) filterData.repo_name = updated.selected_repos.join(',');
//         if (updated.selected_status?.length) filterData.status = updated.selected_status.join(',');
//         if (updated.selected_event_types?.length) filterData.event_type = updated.selected_event_types.join(',');
//         return filterData;
//     };

//     const onFilterUpdate = (uniqueId, selectedList) => {
//         if (uniqueId === 'more-button-adv-0') {
//             setState((current) => ({ ...current, moreAdvFilterList: selectedList }));
//             return;
//         }

//         const updated = { ...state, [uniqueId]: selectedList };
//         const filterData = buildFilterData(updated);
//         const filterActive = Object.keys(filterData).length > 0;

//         setState((current) => ({
//             ...current,
//             [uniqueId]: selectedList,
//             filterActive,
//             filterData: filterActive ? filterData : null,
//         }));
//         fetchInboundEvents(filterActive ? filterData : null);
//     };

//     const resetAdvFilter = () => {
//         setState((current) => ({
//             ...current,
//             selected_committers: [],
//             selected_repos: [],
//             selected_status: [],
//             selected_event_types: [],
//             moreAdvFilterList: ['selected_repos', 'selected_event_types'],
//             reset_filter: current.reset_filter + 1,
//             filterActive: false,
//             filterData: null,
//         }));
//         fetchInboundEvents();
//     };

//     const fetchPage = (pageNumber) => {
//         let endpoint = GenerateURL({}, properties.api.webhook_event_apis.inbound_events_url);
//         if (state.filterData) endpoint = GenerateSearchURL(state.filterData, endpoint);
//         if (pageNumber > 1) endpoint += `${endpoint.includes('?') ? '&' : '?'}limit=${PAGE_SIZE}&offset=${(pageNumber - 1) * PAGE_SIZE}`;
//         fetchInboundEvents(state.filterData, endpoint, pageNumber);
//     };

//     const listing = state.inbound_events_listing || [];
//     const metrics = useMemo(() => listing.reduce((summary, event) => {
//         const tone = getStatusMeta(getEventStatus(event)).tone;
//         if (tone === 'success') summary.succeeded += 1;
//         else if (tone === 'error') summary.failed += 1;
//         else summary.processing += 1;
//         return summary;
//     }, { succeeded: 0, failed: 0, processing: 0 }), [listing]);

//     const refreshExecutions = () => fetchPage(state.curr_page);

//     const advanceFilterConfig = {
//         selected_committers: {
//             labelName: 'Triggered by', uniqueId: 'selected_committers', searchVariable: 'user_name',
//             filterDataPraseFunction: (results) => (Array.isArray(results) ? results : results?.committers || []).map((item) => ({ label: item, value: item })),
//         },
//         selected_repos: {
//             labelName: 'Repository', uniqueId: 'selected_repos', searchVariable: 'repo_name',
//             filterDataPraseFunction: (results) => (Array.isArray(results) ? results : results?.repos || []).map((item) => ({ label: item, value: item })),
//         },
//         selected_event_types: {
//             labelName: 'Event type', uniqueId: 'selected_event_types', searchVariable: 'event_type',
//             filterDataPraseFunction: (results) => (Array.isArray(results) ? results : results?.event_types || []).map((item) => ({ label: item, value: item })),
//         },
//         selected_status: {
//             labelName: 'Execution status', uniqueId: 'selected_status', searchVariable: null,
//             staticList: [{ label: 'Succeeded', value: 'SUCCESS' }, { label: 'Failed', value: 'FAILED' }],
//         },
//     };

//     if (!state.loading && state.error) return <PageError error={state.error} statusCode={state.statusCode} />;

//     return (
//         <Root>
//             <GlobalStyles styles={{ body: { backgroundColor: 'var(--color-grey-000) !important', margin: 0, padding: 0 } }} />

//             <PageHeader
//                 heading="Git event executions"
//                 subHeading="Monitor incoming webhooks and every CI/CD action triggered by your event listeners."
//                 commonDivMargin={false}
//                 icon={false}
//                 imgIcon="/images/Webhook-selected.svg"
//                 backgroundColor="var(--color-white)"
//                 primaryButton={null}
//                 secondaryButton={(
//                     <ButtonIcon
//                         variant="outline"
//                         startIcon="ri-refresh-line"
//                         onClick={refreshExecutions}
//                         disabled={state.loading}
//                         aria-label="Refresh executions"
//                     >
//                         Refresh
//                     </ButtonIcon>
//                 )}
//             />

//             <ContextBanner>
//                 <span className="ri-git-merge-line" />
//                 <div>
//                     <strong>From webhook to deployment</strong>
//                     <p>Each run starts with a Git event, matches one or more listeners, and launches the configured build, deploy, or pipeline actions.</p>
//                 </div>
//             </ContextBanner>

//             <Grid container spacing={2} sx={{ marginTop: 'var(--space-8)' }}>
//                 <Grid item xs={12} sm={6} lg={3}>
//                     <MetricCard icon="ri-radar-line" label="Total deliveries" value={state.count} caption="Across all pages" loading={state.loading} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                     <MetricCard icon="ri-checkbox-circle-line" label="Succeeded" value={metrics.succeeded} caption="On this page" tone="success" loading={state.loading} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                     <MetricCard icon="ri-error-warning-line" label="Failed" value={metrics.failed} caption="On this page" tone="error" loading={state.loading} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} lg={3}>
//                     <MetricCard icon="ri-loader-4-line" label="Processing / other" value={metrics.processing} caption="On this page" tone="running" loading={state.loading} />
//                 </Grid>
//             </Grid>

//             <FilterBar>
//                 <div className="filter-title">
//                     <span className="ri-filter-3-line" />
//                     <div><strong>Filter executions</strong><small>Narrow the run history by source or outcome.</small></div>
//                 </div>
//                 <div className="filter-controls">
//                     {state.moreAdvFilterList.map((filterKey) => {
//                         const config = advanceFilterConfig[filterKey];
//                         if (!config) return null;
//                         return (
//                             <AdvanceSearchFilterCombo
//                                 key={filterKey}
//                                 uniqueId={config.uniqueId}
//                                 labelName={config.labelName}
//                                 staticList={config.staticList || null}
//                                 searchVariable={config.searchVariable}
//                                 getFetchUrl={config.staticList ? null : properties.api.webhook_event_apis.EventListenerStatus_Filter}
//                                 searchUrl={config.staticList ? null : properties.api.webhook_event_apis.EventListenerStatus_Filter}
//                                 filterDataPraseFunction={config.filterDataPraseFunction || null}
//                                 selectedCheckBoxes={state[filterKey]}
//                                 onUpdate={onFilterUpdate}
//                                 reset={state.reset_filter}
//                                 showMoreNotRequired
//                             />
//                         );
//                     })}
//                     <AdvanceSearchFilterCombo
//                         uniqueId="more-button-adv-0"
//                         selectedCheckBoxes={state.moreAdvFilterList}
//                         staticList={moreFilterData}
//                         autoClosedAfterSelection
//                         onUpdate={onFilterUpdate}
//                         variant="more-button-new"
//                         reset={state.reset_filter}
//                     />
//                     {state.filterActive && (
//                         <button type="button" className="clear-filter" onClick={resetAdvFilter}>
//                             <span className="ri-close-line" /> Clear filters
//                         </button>
//                     )}
//                 </div>
//             </FilterBar>

//             <ExecutionPanel>
//                 <div className="panel-heading">
//                     <div>
//                         <h2>Execution history</h2>
//                         <p>{state.loading ? 'Loading runs…' : `${state.count} webhook ${state.count === 1 ? 'delivery' : 'deliveries'} recorded`}</p>
//                     </div>
//                     {!state.loading && listing.length > 0 && <span>Page {state.curr_page} of {state.total_page}</span>}
//                 </div>

//                 <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - var(--space-410))', overflow: 'auto', boxShadow: 'none' }}>
//                     <Table stickyHeader aria-label="Git event execution history">
//                         <Head>
//                             <TableRow>
//                                 <TableCell sx={{ position: 'sticky', left: 0, zIndex: 4, minWidth: 'var(--space-170)' }}>Execution</TableCell>
//                                 <TableCell sx={{ minWidth: 'var(--space-190)' }}>Trigger</TableCell>
//                                 <TableCell sx={{ minWidth: 'var(--space-220)' }}>Repository</TableCell>
//                                 <TableCell sx={{ minWidth: 'var(--space-210)' }}>Matched listener</TableCell>
//                                 <TableCell sx={{ minWidth: 'var(--space-180)' }}>Received</TableCell>
//                                 <TableCell align="right" sx={{ position: 'sticky', right: 0, zIndex: 4, minWidth: 'var(--space-130)' }}>Action</TableCell>
//                             </TableRow>
//                         </Head>

//                         {state.loading ? (
//                             <TableBody>{Array.from({ length: 7 }).map((_, index) => <EventTableRowSkeleton key={index} />)}</TableBody>
//                         ) : listing.length === 0 ? (
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell colSpan={6} sx={{ padding: 0, height: 'var(--space-300)' }}>
//                                         <BlankPage
//                                             text={state.filterActive ? 'No executions match the selected filters' : 'No Git event executions have been received yet'}
//                                             pageIcon={<img style={{ width: 'var(--space-36)', height: 'var(--space-36)' }} src="/images/Webhook-selected.svg" alt="Git event" />}
//                                             backgroundColor="var(--color-white)"
//                                             variant="inside-table"
//                                             dataTestId="Event-Listener-Blank-Page"
//                                             additionalStyles={{ padding: 'var(--space-55) 0', textAlign: 'center', height: 'auto' }}
//                                             primaryButton={state.filterActive
//                                                 ? { actionType: 'button', action: resetAdvFilter, text: 'Clear filters', buttonClass: 'btn-primary m-auto' }
//                                                 : { actionType: 'button', action: refreshExecutions, text: 'Refresh', buttonClass: 'btn-primary m-auto' }}
//                                         />
//                                     </TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         ) : (
//                             <TableBody>
//                                 {listing.map((event) => {
//                                     const provider = getProviderMeta(event.git_repo?.git_provider_id);
//                                     const receivedAt = formatReceivedAt(event.created_at);
//                                     const listeners = Array.isArray(event.git_repo_webhooks_listener)
//                                         ? event.git_repo_webhooks_listener
//                                         : event.git_repo_webhooks_listener ? [event.git_repo_webhooks_listener] : [];
//                                     return (
//                                         <TableBodyRow key={event.id}>
//                                             <TableCell sx={{ position: 'sticky', left: 0, zIndex: 3, minWidth: 'var(--space-170)' }}>
//                                                 <EventStatusChip status={getEventStatus(event)} />
//                                                 <div className="run-id">Run #{event.id}</div>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <NewChip label={formatEventType(event.event_type)} variant="info" shape="standard" size="sm" className="font-11 font-weight-600" />
//                                                 <div className="secondary-line"><span className="ri-user-3-line" /> {event.user_name || 'Unknown actor'}</div>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <div className="repo-cell">
//                                                     <div className="provider-logo"><img src={provider.logo} alt={provider.name} /></div>
//                                                     <div>
//                                                         <Tooltip arrow placement="top" title={event.git_repo?.name || ''}>
//                                                             <div className="primary-line text-ellipsis-150">{event.git_repo?.name || 'Repository unavailable'}</div>
//                                                         </Tooltip>
//                                                         <div className="secondary-line">{provider.name}</div>
//                                                     </div>
//                                                 </div>
//                                             </TableCell>
//                                             <TableCell>
//                                                 {listeners.length > 0 ? (
//                                                     <div className="listener-list">
//                                                         <span className="primary-line">{listeners[0]}</span>
//                                                         {listeners.length > 1 && <span className="more-count">+{listeners.length - 1} more</span>}
//                                                     </div>
//                                                 ) : <span className="muted-value">No listener matched</span>}
//                                             </TableCell>
//                                             <TableCell>
//                                                 <div className="primary-line">{receivedAt.relative}</div>
//                                                 <div className="secondary-line">{receivedAt.exact}</div>
//                                             </TableCell>
//                                             <TableCell align="right" sx={{ position: 'sticky', right: 0, zIndex: 3, minWidth: 'var(--space-130)' }}>
//                                                 <Link to={`/event-listener/details/${event.id}`} style={{ textDecoration: 'none' }}>
//                                                     <ButtonIcon variant="actionOutline" endIcon="ri-arrow-right-line">View run</ButtonIcon>
//                                                 </Link>
//                                             </TableCell>
//                                         </TableBodyRow>
//                                     );
//                                 })}
//                             </TableBody>
//                         )}
//                     </Table>
//                 </TableContainer>
//             </ExecutionPanel>

//             {!state.loading && listing.length > 0 && (
//                 <PaginationBar>
//                     <PaginationTwo
//                         total_count={state.total_page}
//                         current_page_count={state.curr_page}
//                         count={state.count}
//                         next={state.next}
//                         previous={state.previous}
//                         on_previous_click={() => fetchInboundEvents(state.filterData, state.previous, Math.max(1, state.curr_page - 1))}
//                         on_next_click={() => fetchInboundEvents(state.filterData, state.next, Math.min(state.total_page, state.curr_page + 1))}
//                         on_pageNumber_click={fetchPage}
//                     />
//                 </PaginationBar>
//             )}
//         </Root>
//     );
// };

// export default EventListenerStatusRevamp;

// const Root = styled('div')({
//     minHeight: 'calc(100vh - var(--space-52))',
//     padding: 'var(--space-20)',
//     backgroundColor: 'var(--color-grey-000)',
// });

// const ContextBanner = styled('div')({
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: 'var(--space-12)',
//     padding: 'var(--space-12) var(--space-16)',
//     marginTop: 'var(--space-20)',
//     border: 'var(--space-1) solid var(--color-tertiary-200)',
//     borderRadius: 'var(--radius-8)',
//     backgroundColor: 'var(--color-pastel-blue-2)',
//     color: 'var(--color-primary-500)',
//     '& > span': { fontSize: 'var(--font-22)', marginTop: 'var(--space-2)' },
//     '& strong': { display: 'block', fontSize: 'var(--font-13)', fontWeight: 'var(--font-weight-600)' },
//     '& p': { margin: 'var(--space-3) 0 0', fontSize: 'var(--font-12)', color: 'var(--color-content-secondary)', lineHeight: 'var(--line-height-20)' },
// });

// const metricTones = {
//     success: { icon: 'var(--color-success-600)', background: 'var(--color-pastel-green)' },
//     error: { icon: 'var(--color-error-500)', background: 'var(--color-pastel-red)' },
//     running: { icon: 'var(--color-tertiary-600)', background: 'var(--color-pastel-blue-2)' },
//     neutral: { icon: 'var(--color-primary-500)', background: 'var(--color-grey-100)' },
// };

// const MetricCardRoot = styled('div')(({ tone }) => {
//     const palette = metricTones[tone] || metricTones.neutral;
//     return {
//         display: 'flex',
//         alignItems: 'center',
//         gap: 'var(--space-12)',
//         minHeight: 'var(--space-92)',
//         padding: 'var(--space-14) var(--space-16)',
//         border: 'var(--space-1) solid var(--color-grey-200)',
//         borderRadius: 'var(--radius-8)',
//         backgroundColor: 'var(--color-white)',
//         '& .metric-icon': {
//             display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
//             width: 'var(--space-40)', height: 'var(--space-40)', borderRadius: 'var(--radius-8)',
//             color: palette.icon, backgroundColor: palette.background, fontSize: 'var(--font-20)',
//         },
//         '& .metric-label': { fontSize: 'var(--font-11)', color: 'var(--color-content-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' },
//         '& .metric-value': { marginTop: 'var(--space-2)', fontSize: 'var(--font-22)', fontWeight: 'var(--font-weight-600)', color: 'var(--color-content-primary)' },
//         '& .metric-caption': { marginTop: 'var(--space-1)', fontSize: 'var(--font-10)', color: 'var(--color-content-tertiary)' },
//     };
// });

// const FilterBar = styled('div')({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: 'var(--space-16)',
//     flexWrap: 'wrap',
//     marginTop: 'var(--space-20)',
//     padding: 'var(--space-12) var(--space-16)',
//     border: 'var(--space-1) solid var(--color-grey-200)',
//     borderRadius: 'var(--radius-8)',
//     backgroundColor: 'var(--color-white)',
//     '& .filter-title': { display: 'flex', alignItems: 'center', gap: 'var(--space-8)', color: 'var(--color-content-primary)' },
//     '& .filter-title > span': { fontSize: 'var(--font-20)', color: 'var(--color-tertiary-500)' },
//     '& .filter-title strong': { display: 'block', fontSize: 'var(--font-12)', fontWeight: 'var(--font-weight-600)' },
//     '& .filter-title small': { display: 'block', marginTop: 'var(--space-2)', fontSize: 'var(--font-10)', color: 'var(--color-content-tertiary)' },
//     '& .filter-controls': { display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' },
//     '& .clear-filter': {
//         display: 'inline-flex', alignItems: 'center', gap: 'var(--space-4)', height: 'var(--space-36)',
//         padding: '0 var(--space-10)', border: 0, background: 'transparent', color: 'var(--color-tertiary-600)',
//         fontSize: 'var(--font-11)', fontWeight: 'var(--font-weight-600)', cursor: 'pointer', textTransform: 'uppercase',
//     },
// });

// const ExecutionPanel = styled('section')({
//     marginTop: 'var(--space-20)',
//     overflow: 'hidden',
//     border: 'var(--space-1) solid var(--color-grey-200)',
//     borderRadius: 'var(--radius-8)',
//     backgroundColor: 'var(--color-white)',
//     '& .panel-heading': {
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-12)',
//         padding: 'var(--space-14) var(--space-16)', borderBottom: 'var(--space-1) solid var(--color-grey-200)',
//     },
//     '& .panel-heading h2': { margin: 0, fontSize: 'var(--font-14)', fontWeight: 'var(--font-weight-600)', color: 'var(--color-content-primary)' },
//     '& .panel-heading p, & .panel-heading > span': { margin: 'var(--space-3) 0 0', fontSize: 'var(--font-11)', color: 'var(--color-content-tertiary)' },
// });

// const Head = styled(TableHead)({
//     '& th': {
//         padding: 'var(--space-10) var(--space-12)',
//         fontSize: 'var(--font-11)',
//         fontWeight: 'var(--font-weight-700)',
//         color: 'var(--color-content-secondary)',
//         backgroundColor: 'var(--color-grey-000)',
//         borderBottom: 'var(--space-1) solid var(--color-grey-200)',
//         textTransform: 'uppercase',
//         letterSpacing: '0.03em',
//     },
// });

// const TableBodyRow = styled(TableRow)({
//     '& td': { padding: 'var(--space-14) var(--space-12)', backgroundColor: 'var(--color-white)', borderBottom: 'var(--space-1) solid var(--color-grey-100)' },
//     '&:hover td': { backgroundColor: 'var(--color-grey-000)' },
//     '& .run-id': { marginTop: 'var(--space-6)', fontSize: 'var(--font-11)', color: 'var(--color-content-tertiary)', fontFamily: 'monospace' },
//     '& .primary-line': { fontSize: 'var(--font-12)', fontWeight: 'var(--font-weight-500)', color: 'var(--color-content-primary)' },
//     '& .secondary-line': { display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-5)', fontSize: 'var(--font-10)', color: 'var(--color-content-tertiary)' },
//     '& .repo-cell': { display: 'flex', alignItems: 'center', gap: 'var(--space-10)' },
//     '& .provider-logo': { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'var(--space-36)', height: 'var(--space-36)', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-grey-100)', flexShrink: 0 },
//     '& .provider-logo img': { width: 'var(--space-21)', maxHeight: 'var(--space-22)', objectFit: 'contain' },
//     '& .listener-list': { display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' },
//     '& .more-count': { padding: 'var(--space-2) var(--space-6)', borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-grey-100)', color: 'var(--color-content-tertiary)', fontSize: 'var(--font-10)' },
//     '& .muted-value': { fontSize: 'var(--font-11)', color: 'var(--color-content-tertiary)', fontStyle: 'italic' },
// });

// const PaginationBar = styled('div')({
//     marginTop: 'var(--space-12)',
//     padding: 'var(--space-10) var(--space-4)',
//     borderTop: 'var(--space-1) solid var(--color-grey-200)',
//     backgroundColor: 'var(--color-grey-000)',
// 	});
